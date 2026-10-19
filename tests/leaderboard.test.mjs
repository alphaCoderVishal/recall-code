import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { leaderboardView } from "../src/leaderboard.js";

test("leaderboard derives distinct latest scores, isolates private data, respects opt-in and equal ranks", async () => {
  const db = new PGlite();
  const alice = "11111111-1111-1111-1111-111111111111",
    bob = "22222222-2222-2222-2222-222222222222";
  const asUser = async (id) =>
    db.exec(
      `reset role; set role authenticated; select set_config('request.jwt.claim.sub','${id}',false)`,
    );
  const save = async (history, revision) =>
    db.query("select public.save_study_snapshot($1::jsonb,$2)", [
      JSON.stringify({
        cards: [{ id: "a" }, { id: "a" }, { id: "b" }],
        history,
      }),
      revision,
    ]);
  const rankings = async () =>
    (await db.query("select * from public.get_leaderboard()")).rows;
  try {
    await db.exec(`create role anon; create role authenticated; create schema auth; create table auth.users(id uuid primary key);
      create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
      grant usage on schema auth to authenticated,anon; grant execute on function auth.uid() to authenticated,anon;
      insert into auth.users values('${alice}'),('${bob}');`);
    for (const path of [
      "202610200001_study_sync.sql",
      "202610200002_leaderboard.sql",
    ])
      await db.exec(await readFile("supabase/migrations/" + path, "utf8"));
    await db.exec("set role anon");
    await assert.rejects(
      db.query("select * from public.get_leaderboard()"),
      /permission denied/,
    );
    await asUser(alice);
    await save(
      [
        { cardId: "a", rating: "Good", at: 1 },
        { cardId: "a", rating: "Easy", at: 2 },
        { cardId: "orphan", rating: "Easy", at: 9 },
      ],
      0,
    );
    assert.equal((await rankings()).length, 0);
    await db.query("select public.set_leaderboard_profile('Alice',true)");
    assert.equal((await rankings())[0].correct_cards, 1);
    await assert.rejects(
      db.query("update public.leaderboard_profiles set correct_cards=999"),
      /permission denied/,
    );
    await asUser(bob);
    assert.equal(
      (await db.query("select * from public.leaderboard_profiles")).rows.length,
      0,
    );
    assert.equal((await rankings())[0].is_me, false);
    assert.deepEqual(Object.keys((await rankings())[0]).sort(), [
      "correct_cards",
      "display_name",
      "is_me",
      "rank",
    ]);
    await save([{ cardId: "b", rating: "Good", at: 5 }], 0);
    await db.query("select public.set_leaderboard_profile('Bob',true)");
    assert.deepEqual(
      (await rankings()).map((r) => Number(r.rank)),
      [1, 1],
    );
    await asUser(alice);
    await save(
      [
        { cardId: "a", rating: "Again", at: 10 },
        { cardId: "a", rating: "Easy", at: 2 },
      ],
      1,
    );
    assert.equal((await rankings()).find((r) => r.is_me).correct_cards, 0);
    await db.query("select public.set_leaderboard_profile('Alice',false)");
    assert.equal((await rankings()).length, 1);
    await assert.rejects(
      db.query("select public.set_leaderboard_profile(' ',true)"),
      /display name/,
    );
  } finally {
    await db.close();
  }
});

test("leaderboard renders names as text and explains guest and failure states", () => {
  const html = leaderboardView(
    {
      rows: [
        {
          rank: 1,
          display_name: "<img src=x onerror=alert(1)>",
          correct_cards: 7,
          is_me: true,
        },
      ],
      profile: null,
    },
    true,
    true,
    7,
  );
  assert.ok(html.includes("&lt;img"));
  assert.ok(!html.includes("<img"));
  assert.ok(html.includes("Self-reported recall"));
  assert.ok(
    leaderboardView({}, false, true, 0).includes("Sign in with GitHub"),
  );
  assert.ok(
    leaderboardView({ error: true }, true, true, 0).includes(
      "Leaderboard unavailable",
    ),
  );
});
