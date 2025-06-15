const CACHE_NAME = "v1";
const ASSETS = [
  "/",
  "/index.html",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  /* aggiungi qui CSS/JS di build, es. "/assets/index.abc123.js" */
];

// Al “install” cache dei file essenziali
self.addEventListener("install", (e) =>
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  )
);

// Al fetch prova la cache, poi network
self.addEventListener("fetch", (e) =>
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  )
);
