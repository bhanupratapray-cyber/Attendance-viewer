const CACHE_NAME = 'attendance-portal-v4';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  // Ignore all POST requests and Google Apps Script API calls so they don't get blocked
  if (event.request.method === 'POST' || event.request.url.includes('script.google.com')) {
    return; 
  }

  // Handle local files (HTML, CSS, JSON) normally
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
