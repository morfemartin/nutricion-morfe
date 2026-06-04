const CACHE_NAME = "nutricion-morfe-v45";
const ASSETS = [
  "./",
  "./index.html",
  "./mama.html",
  "./app.js",
  "./manifest.json",
  "./manifest-mama.json",
  "./icon.svg",
  "./icon-mama.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-192.png",
  "./icon-maskable-512.png",
  "./icon-mama-192.png",
  "./icon-mama-512.png",
  "./icon-mama-maskable-192.png",
  "./icon-mama-maskable-512.png",
  "./data/plans.v1.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
