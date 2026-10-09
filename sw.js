const CACHE_NAME = 'ielts-vocab-srs-v3-network-first';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => self.clients.claim())
  );
});

// Network-First Strategy to prevent stale app caching
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then((response) => {
      return response;
    }).catch(() => {
      return caches.match(e.request);
    })
  );
});
