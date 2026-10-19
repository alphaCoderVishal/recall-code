const API = typeof __REMINDERS_URL__ === "undefined" ? "" : __REMINDERS_URL__;
const KEY = "recallcode.reminders.v1";
export function reminderState() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}
export function pushSupported() {
  return (
    isSecureContext &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}
export const remindersConfigured = Boolean(API);
async function request(path, method, body) {
  const state = reminderState();
  const response = await fetch(API + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(state.token ? { Authorization: "Bearer " + state.token } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const result = await response.json();
  if (!response.ok)
    throw new Error(result.error || "Reminder service unavailable.");
  return result;
}
function decode(value) {
  const base = value.replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(
    atob(base.padEnd(Math.ceil(base.length / 4) * 4, "=")),
    (c) => c.charCodeAt(0),
  );
}
export async function enableReminders(time, onProgress = () => {}) {
  if (!API) throw new Error("Reminder service is not configured yet.");
  if (!pushSupported())
    throw new Error(
      "Push is unavailable here. On iPhone/iPad, add RecallCode to your Home Screen and open it there first.",
    );
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))
    throw new Error("Choose a valid time.");
  onProgress("Waiting for notification permission in your browser…");
  const permission = await Notification.requestPermission();
  if (permission !== "granted")
    throw new Error(
      "Notifications were not allowed. You can change this in browser site settings.",
    );
  let state = reminderState();
  if (!state.token) {
    state = {
      ...state,
      token: [...crypto.getRandomValues(new Uint8Array(32))]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join(""),
    };
    localStorage.setItem(KEY, JSON.stringify(state));
  }
  onProgress("Connecting this browser for reminders…");
  await navigator.serviceWorker.register("./sw.js");
  const registration = await navigator.serviceWorker.ready;
  const config = await request("/config", "GET");
  let subscription = await registration.pushManager.getSubscription();
  onProgress("Creating your device notification subscription…");
  subscription ??= await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: decode(config.publicKey),
  });
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  onProgress("Saving your daily reminder…");
  const result = await request("/subscription", "PUT", {
    subscription: subscription.toJSON(),
    time,
    zone,
  });
  localStorage.setItem(
    KEY,
    JSON.stringify({
      ...state,
      time,
      zone,
      enabled: true,
      pendingRemoval: false,
      nextAt: result.nextAt,
    }),
  );
  return result;
}
export async function disableReminders() {
  // Revoke delivery locally even if the server is temporarily unreachable.
  const registration = await navigator.serviceWorker.getRegistration();
  const sub = await registration?.pushManager.getSubscription();
  if (sub) await sub.unsubscribe();
  localStorage.setItem(
    KEY,
    JSON.stringify({
      ...reminderState(),
      enabled: false,
      pendingRemoval: true,
    }),
  );
  try {
    await request("/subscription", "DELETE");
  } catch {
    throw new Error(
      "Browser delivery stopped. Server removal failed—press Turn off again when online.",
    );
  }
  const state = reminderState();
  localStorage.setItem(
    KEY,
    JSON.stringify({ ...state, enabled: false, pendingRemoval: false }),
  );
}
export async function testReminder() {
  await request("/test", "POST");
}
