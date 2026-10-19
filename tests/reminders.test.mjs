import test from "node:test";
import assert from "node:assert/strict";
import { nextReminder, validateSubscription } from "../worker/shared.js";
import worker, { handle, scheduled } from "../worker/index.js";
import {
  readFeedback,
  playFeedback,
  feedbackMessage,
} from "../src/feedback.js";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
function database() {
  const db = new DatabaseSync(":memory:");
  db.exec(readFileSync("worker/schema.sql", "utf8"));
  return {
    db,
    prepare(sql) {
      let args = [];
      return {
        bind(...v) {
          args = v;
          return this;
        },
        async first() {
          return db.prepare(sql).get(...args) || null;
        },
        async all() {
          return { results: db.prepare(sql).all(...args) };
        },
        async run() {
          const r = db.prepare(sql).run(...args);
          return { meta: { changes: r.changes } };
        },
      };
    },
  };
}
const token = "a".repeat(64),
  origin = "https://recall-code.pages.dev";
function req(path, method = "GET", body, auth = token) {
  return new Request("https://reminders.test" + path, {
    method,
    headers: {
      Origin: origin,
      Authorization: "Bearer " + auth,
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}
async function keys() {
  const pair = await crypto.subtle.generateKey(
    { name: "ECDH", namedCurve: "P-256" },
    true,
    ["deriveBits"],
  );
  return {
    p256dh: Buffer.from(
      await crypto.subtle.exportKey("raw", pair.publicKey),
    ).toString("base64url"),
    auth: Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString(
      "base64url",
    ),
  };
}
test("daily schedule follows local calendar through DST and skips a past time", () => {
  assert.equal(
    new Date(
      nextReminder("20:00", "Asia/Kolkata", Date.parse("2026-10-20T12:00Z")),
    ).toISOString(),
    "2026-10-20T14:30:00.000Z",
  );
  assert.equal(
    new Date(
      nextReminder(
        "09:00",
        "America/New_York",
        Date.parse("2026-03-07T15:00Z"),
      ),
    ).toISOString(),
    "2026-03-08T13:00:00.000Z",
  );
  assert.equal(
    new Date(
      nextReminder(
        "09:00",
        "America/New_York",
        Date.parse("2026-10-31T15:00Z"),
      ),
    ).toISOString(),
    "2026-11-01T14:00:00.000Z",
  );
  assert.throws(() => nextReminder("25:30", "UTC"));
  assert.throws(() => nextReminder("09:00", "bad/zone"));
});
test("endpoint validation rejects SSRF destinations", () => {
  for (const endpoint of [
    "https://localhost/test",
    "http://fcm.googleapis.com/x",
    "https://fcm.googleapis.com.evil.test/x",
    "https://user@fcm.googleapis.com/x",
  ])
    assert.throws(() =>
      validateSubscription({
        endpoint,
        keys: { p256dh: "a".repeat(87), auth: "a".repeat(22) },
      }),
    );
});
test("device capability controls edit and deletion; origin rejected; duplicate endpoint cannot be stolen", async () => {
  const env = { DB: database(), APP_ORIGIN: origin, VAPID_PUBLIC_KEY: "test" };
  const body = {
    subscription: {
      endpoint: "https://fcm.googleapis.com/fcm/send/test",
      keys: await keys(),
    },
    time: "20:00",
    zone: "Asia/Kolkata",
  };
  assert.equal(
    (
      await worker.fetch(
        new Request("https://x/subscription", { method: "PUT" }),
        env,
      )
    ).status,
    403,
  );
  assert.equal(
    (await handle(req("/subscription", "PUT", body, "bad"), env)).status,
    401,
  );
  assert.equal(
    (await handle(req("/subscription", "PUT", body), env)).status,
    200,
  );
  assert.equal(
    (await handle(req("/subscription", "PUT", body, "b".repeat(64)), env))
      .status,
    409,
  );
  await handle(req("/subscription", "DELETE", null, "b".repeat(64)), env);
  assert.equal(
    env.DB.db.prepare("select count(*) n from reminders").get().n,
    1,
  );
  await handle(req("/subscription", "DELETE"), env);
  assert.equal(
    env.DB.db.prepare("select count(*) n from reminders").get().n,
    0,
  );
});
test("scheduled pushes encrypt payload, claim once, and remove expired endpoints", async () => {
  const DB = database();
  const pair = await crypto.subtle.generateKey(
    { name: "ECDSA", namedCurve: "P-256" },
    true,
    ["sign", "verify"],
  );
  const jwk = await crypto.subtle.exportKey("jwk", pair.privateKey);
  const pub = Buffer.from(
    await crypto.subtle.exportKey("raw", pair.publicKey),
  ).toString("base64url");
  const env = {
    DB,
    APP_ORIGIN: origin,
    VAPID_PUBLIC_KEY: pub,
    VAPID_PRIVATE_KEY: jwk.d,
  };
  const body = {
    subscription: {
      endpoint: "https://fcm.googleapis.com/fcm/send/test",
      keys: await keys(),
    },
    time: "20:00",
    zone: "Asia/Kolkata",
  };
  await handle(req("/subscription", "PUT", body), env);
  DB.db.exec("UPDATE reminders SET next_at=0");
  let sends = 0;
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async (url, init) => {
      sends++;
      assert.ok(init.body);
      return new Response(null, { status: 201 });
    };
    await scheduled(env);
    await scheduled(env);
    assert.equal(sends, 1);
    DB.db.exec("UPDATE reminders SET next_at=0");
    globalThis.fetch = async () => new Response(null, { status: 410 });
    await scheduled(env);
    assert.equal(DB.db.prepare("select count(*) n from reminders").get().n, 0);
  } finally {
    globalThis.fetch = original;
  }
});
test("sound defaults are quiet and disabled playback does not construct audio", async () => {
  assert.deepEqual(readFeedback({ getItem: () => null }), {
    sound: false,
    volume: 0.3,
  });
  assert.equal(await playFeedback("good", { sound: false, volume: 1 }), false);
  assert.match(feedbackMessage("Again"), /another try/);
  assert.match(feedbackMessage("Good"), /Nice recall/);
});
