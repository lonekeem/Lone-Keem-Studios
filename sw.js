// The site moved to https://lonekeem.github.io/. This worker replaces the old one at
// /Lone-Keem-Studios/, clears the old caches, unregisters itself and reloads open tabs
// so they pick up the redirect.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter((k) => /^lks-v[1-9]$/.test(k)).map((k) => caches.delete(k)));
  await self.registration.unregister();
  const tabs = await self.clients.matchAll({ type: 'window' });
  tabs.forEach((c) => c.navigate(c.url).catch(() => {}));
})()));
