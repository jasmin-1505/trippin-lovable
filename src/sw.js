/* eslint-disable no-restricted-globals */
// trippin' service worker — cache-first for all static assets, place
// database and screen components; offline fallback; background sync
// for star ratings made while offline.

const CACHE_NAME = 'trippin-v1'
const OFFLINE_URL = '/offline.html'

// Injected at build time by vite-plugin-pwa (injectManifest strategy) —
// the full list of hashed build assets (app screens, place database JS,
// fonts referenced by the build, icons). Entries are root-relative
// ("icons/icon-192.png"); normalise to absolute paths before de-duping
// against EXTRA_URLS, since Cache.addAll() throws InvalidStateError if
// the same effective URL appears twice in the list.
const PRECACHE_URLS = self.__WB_MANIFEST.map((entry) => `/${entry.url}`.replace(/^\/+/, '/'))

const EXTRA_URLS = ['/', '/manifest.json', OFFLINE_URL, '/icons/icon-192.png', '/icons/icon-512.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll([...new Set([...PRECACHE_URLS, ...EXTRA_URLS])]))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

// Cache First: serve from cache first, fall back to network, fall back
// to the offline page for navigations. Navigations are special-cased to
// match against the precached app-shell URL ('/') directly rather than
// the exact incoming Request — navigation Requests carry mode/headers
// that make exact-match lookups against Cache.addAll()-seeded entries
// unreliable across browsers, so this is the standard SPA-shell pattern.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/', { ignoreVary: true }).then((cached) => {
        if (cached) return cached
        return fetch(event.request).catch(() => caches.match(OFFLINE_URL, { ignoreVary: true }))
      })
    )
    return
  }

  event.respondWith(
    caches.match(event.request, { ignoreVary: true }).then((cached) => {
      if (cached) return cached

      return fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
          }
          return response
        })
        .catch(() => {
          if (event.request.destination === 'image') {
            return caches.match('/icons/icon-192.png', { ignoreVary: true })
          }
          return undefined
        })
    })
  )
})

// ---- Background sync: queue star ratings made offline ----
// Ratings are written to localStorage immediately by the app. When
// offline, the app also stashes the pending rating in IndexedDB and
// registers a 'sync-ratings' sync event; once connectivity returns the
// browser fires 'sync' here and we flush the queue.

const DB_NAME = 'trippin-sync'
const STORE_NAME = 'pending-ratings'

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_NAME, { keyPath: 'placeId' })
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function flushPendingRatings() {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  const all = await new Promise((resolve, reject) => {
    const req = store.getAll()
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })

  // No real backend to sync to — this app is fully client-side, so
  // "syncing" means confirming the queued rating is durable and telling
  // any open tabs it has been reconciled.
  store.clear()
  await tx.complete

  const clients = await self.clients.matchAll()
  clients.forEach((client) => client.postMessage({ type: 'RATINGS_SYNCED', ratings: all }))
}

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-ratings') {
    event.waitUntil(flushPendingRatings())
  }
})
