import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
test('actual Postgres RLS denies anonymous and cross-account access; revision conflicts preserve data',async()=>{
  const db=new PGlite();
  try {
    await db.exec(`create role anon; create role authenticated; create schema auth; create table auth.users(id uuid primary key);
      create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
      grant usage on schema auth to authenticated,anon;grant execute on function auth.uid() to authenticated,anon;
      insert into auth.users values ('11111111-1111-1111-1111-111111111111'),('22222222-2222-2222-2222-222222222222');`);
    await db.exec(await readFile('supabase/migrations/202610200001_study_sync.sql','utf8'));
    await db.exec('set role anon');await assert.rejects(db.query('select * from public.study_snapshots'),/permission denied/);
    await assert.rejects(db.query(`select public.save_study_snapshot('{}',0)`),/permission denied/);
    await db.exec(`reset role;set role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-1111-1111-111111111111',false);`);
    assert.equal((await db.query(`select public.save_study_snapshot(' {"version":1}',0) as revision`)).rows[0].revision,1);
    await assert.rejects(db.query(`select public.save_study_snapshot('{"lost":true}',0)`),/Snapshot conflict/);
    assert.equal((await db.query('select count(*)::int as n from public.study_snapshots')).rows[0].n,1);
    await db.exec(`select set_config('request.jwt.claim.sub','22222222-2222-2222-2222-222222222222',false);`);
    assert.equal((await db.query('select count(*)::int as n from public.study_snapshots')).rows[0].n,0);
    await assert.rejects(db.query(`insert into public.study_snapshots(user_id,document)values('11111111-1111-1111-1111-111111111111','{}')`),/row-level security/);
    assert.equal((await db.query(`update public.study_snapshots set document='{}' where user_id='11111111-1111-1111-1111-111111111111' returning user_id`)).rows.length,0);
    await assert.rejects(db.query('delete from public.study_snapshots'),/permission denied/);
    await db.exec(`select set_config('request.jwt.claim.sub','11111111-1111-1111-1111-111111111111',false);`);
    assert.equal((await db.query(`select public.save_study_snapshot('{"version":1,"updated":true}',1) as revision`)).rows[0].revision,2);
    await assert.rejects(db.query(`update public.study_snapshots set user_id='22222222-2222-2222-2222-222222222222'`),/row-level security/);
  } finally {await db.close();}
});
