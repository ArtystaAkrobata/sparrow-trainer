const CACHE = 'sparrow-v1.0.18';
const FILES = [
  './', './index.html', './styles.css?v=1.0.18', './app.js?v=1.0.18', './manifest.webmanifest',
  './assets/icon-192.svg', './assets/icon-512.svg', './assets/logo-wordmark.svg', './assets/sparrow-badge.svg', './assets/countdown-8bit.mp3.b64', './assets/tabata-sparrow-mix.ogg.b64', './assets/prep-countdown-10s.ogg.b64', './assets/end-work-game-3plus1.ogg.b64', './assets/start-work-go.ogg.b64', './assets/station-change-ticking.ogg.b64'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(response => {
    if(response.ok) { const copy=response.clone(); caches.open(CACHE).then(cache=>cache.put(event.request,copy)); }
    return response;
  })));
});