const CACHE = "ideaspark-v161-custom-type-keyboard-scroll-safe";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./splash.png",
  "./splash-new.png",
  "./vendor/mammoth.browser.min.js",
  "./vendor/pdf.min.mjs",
  "./vendor/pdf.worker.min.mjs"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  if (e.request.url.includes("anthropic.com") || e.request.url.includes("openrouter.ai")) return;
  if (e.request.url.endsWith(".html") || e.request.url.endsWith("/")) {
    e.respondWith(
      fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }))
  );
});
