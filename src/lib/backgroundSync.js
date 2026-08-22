// Queues a star rating in IndexedDB and registers a background sync so it
// flushes once connectivity returns (see src/sw.js).

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

export async function queueRatingForSync(placeId, rating) {
  if (!('indexedDB' in window)) return

  const db = await openDB()
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    tx.objectStore(STORE_NAME).put({ placeId, rating, queuedAt: Date.now() })
    tx.oncomplete = resolve
    tx.onerror = () => reject(tx.error)
  })

  const reg = await navigator.serviceWorker?.ready
  if (reg && 'sync' in reg) {
    try {
      await reg.sync.register('sync-ratings')
    } catch {
      // Background Sync unsupported — the rating is still safe in
      // localStorage and IndexedDB, it just won't auto-flush.
    }
  }
}
