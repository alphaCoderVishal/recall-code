-- Free-tier friendly: static curriculum stays on Cloudflare; only user state syncs.
create table if not exists public.study_snapshots (
  user_id uuid primary key references auth.users(id) on delete cascade,
  document jsonb not null check (jsonb_typeof(document) = 'object'),
  revision bigint not null default 1 check (revision > 0),
  updated_at timestamptz not null default now(),
  constraint snapshot_size check (octet_length(document::text) <= 5242880)
);
alter table public.study_snapshots enable row level security;
revoke all on public.study_snapshots from anon, authenticated;
grant select, insert, update on public.study_snapshots to authenticated;
create policy "Read own study data" on public.study_snapshots for select to authenticated using ((select auth.uid()) = user_id);
create policy "Create own study data" on public.study_snapshots for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Update own study data" on public.study_snapshots for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create or replace function public.save_study_snapshot(p_document jsonb, p_expected_revision bigint)
returns bigint language plpgsql security invoker set search_path = '' as $$
declare v_user uuid := auth.uid(); v_revision bigint;
begin
  if v_user is null then raise exception 'Authentication required' using errcode = '42501'; end if;
  if p_expected_revision < 0 or jsonb_typeof(p_document) <> 'object' or p_document is null then
    raise exception 'Invalid snapshot' using errcode = '22023';
  end if;
  if p_expected_revision = 0 then
    insert into public.study_snapshots(user_id, document, revision)
    values(v_user, p_document, 1) on conflict (user_id) do nothing returning revision into v_revision;
    if v_revision is not null then return v_revision; end if;
  end if;
  update public.study_snapshots set document = p_document, revision = revision + 1, updated_at = now()
  where user_id = v_user and revision = p_expected_revision returning revision into v_revision;
  if v_revision is null then raise exception 'Snapshot conflict' using errcode = '40001'; end if;
  return v_revision;
end;
$$;
revoke all on function public.save_study_snapshot(jsonb,bigint) from public, anon;
grant execute on function public.save_study_snapshot(jsonb,bigint) to authenticated;
