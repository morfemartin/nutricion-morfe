const CACHE_NAME = "nutricion-morfe-v48";
const ASSETS = [
  "./",
  "./index.html",
  "./mama.html",
  "./styles.css",
  "./app.js",
  "./vendor/react.production.min.js",
  "./vendor/react-dom.production.min.js",
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
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
