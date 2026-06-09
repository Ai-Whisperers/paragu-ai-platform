/// <reference lib="webworker" />

const CACHE_NAME = 'cuidadoamiga-v1'
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
]

self.addEventListener('install', (event: Event) => {
  ;(event as any).waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)),
  )
})

self.addEventListener('fetch', (event: Event) => {
  ;(event as any).respondWith(
    caches.match((event as any).request).then((response) => response ?? fetch((event as any).request)),
  )
})

self.addEventListener('activate', (event: Event) => {
  ;(event as any).waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ),
  )
})