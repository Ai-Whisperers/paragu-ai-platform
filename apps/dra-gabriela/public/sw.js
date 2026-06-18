// Service worker for offline support.
//
// Caches the home page, contact page, and a few static assets so the site
// remains accessible when the network is down. On fetch, returns the cached
// version first if available (cache-first strategy for navigation requests).
//
// Updated 2026-06-18

const CACHE_NAME = "dra-gp-v1"
const PRECACHE_URLS = [
  "/en",
  "/es",
  "/en/contact",
  "/es/contacto",
  "/en/favicon.svg",
  "/manifest.json",
]

// Install: pre-cache the home and contact pages.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        // Network might fail during install — log but don't throw
        console.warn("[sw] precache failed", err)
      })
    })
  )
  self.skipWaiting()
})

// Activate: clean up old caches.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  )
  self.clients.claim()
})

// Fetch: navigation requests use network-first, fall back to cache.
// Other requests use cache-first, fall back to network.
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return
  if (request.method !== "GET") return

  // Navigation requests: network-first, fall back to cache
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          // Cache successful responses for offline
          const copy = res.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
          return res
        })
        .catch(() =>
          caches.match(request).then(
            (cached) => cached || caches.match("/en")
          )
        )
    )
    return
  }

  // Static assets: cache-first
  event.respondWith(
    caches.match(request).then(
      (cached) => cached ||
        fetch(request).then((res) => {
          // Cache successful responses
          if (res.ok) {
            const copy = res.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
          }
          return res
        })
    )
  )
})
