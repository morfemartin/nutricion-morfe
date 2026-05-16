const CACHE_NAME = "nutricion-morfe-v29";
const ASSETS = ["./", "./index.html", "./manifest.json", "./icon.svg", "./data/plans.v1.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
