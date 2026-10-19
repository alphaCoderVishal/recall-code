self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data?.json() || {};
  } catch {}
  event.waitUntil(
    self.registration.showNotification(data.title || "Time for RecallCode", {
      body: data.body || "Practice a few interview ideas today.",
      icon: "./favicon.svg",
      tag: data.tag || "recallcode-daily",
      data: { url: self.registration.scope },
      renotify: false,
    }),
  );
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    (async () => {
      const url = self.registration.scope;
      const tabs = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      for (const tab of tabs) {
        if (tab.url.startsWith(url)) return tab.focus();
      }
      return self.clients.openWindow(url);
    })(),
  );
});
