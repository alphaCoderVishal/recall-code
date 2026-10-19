import { DateTime } from "luxon";
export function nextReminder(time, zone, now = Date.now()) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))
    throw new Error("Choose a valid reminder time.");
  const local = DateTime.fromMillis(now, { zone });
  if (!local.isValid) throw new Error("Invalid time zone.");
  const [hour, minute] = time.split(":").map(Number);
  let next = local.startOf("day").set({ hour, minute });
  if (next.toMillis() <= now)
    next = local.plus({ days: 1 }).startOf("day").set({ hour, minute });
  return next.toMillis();
}
export function validateSubscription(s) {
  const url = new URL(s?.endpoint);
  const host = url.hostname;
  if (
    url.protocol !== "https:" ||
    url.port ||
    url.username ||
    url.password ||
    url.hash ||
    s.endpoint.length > 2048 ||
    !(
      host === "fcm.googleapis.com" ||
      host.endsWith(".push.services.mozilla.com") ||
      host === "updates.push.services.mozilla.com" ||
      host.endsWith(".notify.windows.com") ||
      host === "web.push.apple.com" ||
      host.endsWith(".push.apple.com")
    )
  )
    throw new Error("Unsupported push service.");
  if (
    !/^[A-Za-z0-9_-]{87}={0,2}$/.test(s.keys?.p256dh || "") ||
    !/^[A-Za-z0-9_-]{22}={0,2}$/.test(s.keys?.auth || "")
  )
    throw new Error("Invalid push keys.");
  return {
    endpoint: s.endpoint,
    keys: { p256dh: s.keys.p256dh, auth: s.keys.auth },
  };
}
export async function digest(value) {
  return [
    ...new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)),
    ),
  ]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}
