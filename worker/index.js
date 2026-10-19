import { buildPushPayload } from "@block65/webcrypto-web-push";
import { nextReminder, validateSubscription, digest } from "./shared.js";
const reply = (data, status = 200) => Response.json(data, { status });
export async function sendPush(row, env, test = false) {
  const subscription = JSON.parse(row.subscription);
  const payload = await buildPushPayload(
    {
      data: JSON.stringify({
        title: test
          ? "Your reminders are ready"
          : "A little recall goes a long way",
        body: test
          ? "RecallCode can reach this device."
          : "Take five minutes to practice a few interview ideas.",
        tag: test ? "recallcode-test" : "recallcode-daily",
      }),
      options: { ttl: 3600 },
    },
    subscription,
    {
      subject: env.APP_ORIGIN,
      publicKey: env.VAPID_PUBLIC_KEY,
      privateKey: env.VAPID_PRIVATE_KEY,
    },
  );
  return fetch(subscription.endpoint, {
    ...payload,
    redirect: "error",
    signal: AbortSignal.timeout(10000),
  });
}
export async function handle(request, env) {
  const path = new URL(request.url).pathname;
  if (path === "/health") return reply({ ok: true });
  if (path === "/config" && request.method === "GET")
    return reply({ publicKey: env.VAPID_PUBLIC_KEY });
  if (path !== "/subscription" && path !== "/test")
    return reply({ error: "Not found" }, 404);
  const token = request.headers.get("Authorization")?.replace(/^Bearer /, "");
  if (!/^[a-f0-9]{64}$/.test(token || ""))
    return reply({ error: "Device token required" }, 401);
  const id = await digest(token),
    now = Date.now();
  if (path === "/subscription" && request.method === "DELETE") {
    await env.DB.prepare("DELETE FROM reminders WHERE id=?").bind(id).run();
    return reply({ ok: true });
  }
  if (path === "/subscription" && request.method === "PUT") {
    if (Number(request.headers.get("content-length")) > 8192)
      return reply({ error: "Too large" }, 413);
    const text = await request.text();
    if (text.length > 8192) return reply({ error: "Too large" }, 413);
    const body = JSON.parse(text),
      sub = validateSubscription(body.subscription),
      next = nextReminder(body.time, body.zone, now);
    const existing = await env.DB.prepare("SELECT id FROM reminders WHERE id=?")
      .bind(id)
      .first();
    if (!existing) {
      const recent = await env.DB.prepare(
        "SELECT count(*) AS n FROM reminders WHERE updated_at>?",
      )
        .bind(now - 3600000)
        .first();
      if (recent.n >= 100)
        return reply(
          { error: "Too many new reminders this hour. Please try later." },
          429,
        );

      const count = await env.DB.prepare(
        "SELECT count(*) AS n FROM reminders",
      ).first();
      if (count.n >= 1000)
        return reply({ error: "Reminder capacity reached. Try later." }, 503);
    }
    const endpointHash = await digest(sub.endpoint);
    const owner = await env.DB.prepare(
      "SELECT id FROM reminders WHERE endpoint_hash=?",
    )
      .bind(endpointHash)
      .first();
    if (owner && owner.id !== id)
      return reply(
        {
          error:
            "This subscription belongs to another device token. Reset browser notification permission and try again.",
        },
        409,
      );
    await env.DB.prepare(
      "INSERT INTO reminders(id,endpoint_hash,subscription,time,zone,next_at,updated_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET endpoint_hash=excluded.endpoint_hash,subscription=excluded.subscription,time=excluded.time,zone=excluded.zone,next_at=excluded.next_at,updated_at=excluded.updated_at,failures=0",
    )
      .bind(
        id,
        endpointHash,
        JSON.stringify(sub),
        body.time,
        body.zone,
        next,
        now,
      )
      .run();
    return reply({ ok: true, nextAt: next });
  }
  if (path === "/test" && request.method === "POST") {
    const row = await env.DB.prepare("SELECT * FROM reminders WHERE id=?")
      .bind(id)
      .first();
    if (!row) return reply({ error: "Enable reminders first." }, 404);
    const claim = await env.DB.prepare(
      "UPDATE reminders SET test_at=? WHERE id=? AND test_at<?",
    )
      .bind(now, id, now - 60000)
      .run();
    if (!claim.meta.changes)
      return reply({ error: "Wait a minute before another test." }, 429);
    const response = await sendPush(row, env, true);
    if (!response.ok)
      return reply(
        { error: "Push delivery failed. Re-enable reminders." },
        502,
      );
    return reply({ ok: true });
  }
  return reply({ error: "Method not allowed" }, 405);
}
export async function scheduled(env, now = Date.now()) {
  const { results } = await env.DB.prepare(
    "SELECT * FROM reminders WHERE next_at<=? ORDER BY next_at LIMIT 10",
  )
    .bind(now)
    .all();
  for (const row of results) {
    const next = nextReminder(row.time, row.zone, now);
    const claim = await env.DB.prepare(
      "UPDATE reminders SET next_at=? WHERE id=? AND next_at=?",
    )
      .bind(next, row.id, row.next_at)
      .run();
    if (!claim.meta.changes) continue;
    try {
      const response = await sendPush(row, env);
      if (response.status === 404 || response.status === 410) {
        await env.DB.prepare("DELETE FROM reminders WHERE id=?")
          .bind(row.id)
          .run();
        continue;
      }
      if (!response.ok) throw new Error("Push service unavailable");
      await env.DB.prepare("UPDATE reminders SET failures=0 WHERE id=?")
        .bind(row.id)
        .run();
    } catch {
      // Bounded retries; expired or repeatedly failing subscriptions are removed.
      if (row.failures >= 7)
        await env.DB.prepare("DELETE FROM reminders WHERE id=?")
          .bind(row.id)
          .run();
      else
        await env.DB.prepare(
          "UPDATE reminders SET failures=failures+1,next_at=? WHERE id=? AND next_at=?",
        )
          .bind(row.failures < 2 ? now + 5 * 60000 : next, row.id, next)
          .run();
    }
  }
}
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    if (origin !== env.APP_ORIGIN)
      return reply({ error: "Origin not allowed" }, 403);
    const headers = {
      "Access-Control-Allow-Origin": env.APP_ORIGIN,
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      Vary: "Origin",
      "Cache-Control": "no-store",
    };
    if (request.method === "OPTIONS")
      return new Response(null, { status: 204, headers });
    let result;
    try {
      result = await handle(request, env);
    } catch (error) {
      result = reply(
        {
          error:
            error instanceof SyntaxError
              ? "Invalid request."
              : "Unable to process reminder request.",
        },
        400,
      );
    }
    for (const [key, value] of Object.entries(headers))
      result.headers.set(key, value);
    return result;
  },
  async scheduled(event, env, ctx) {
    ctx.waitUntil(scheduled(env));
  },
};
