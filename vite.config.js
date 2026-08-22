import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // We ship a hand-authored public/manifest.json + custom service
      // worker (src/sw.js) so the exact spec (cache name, cache-first
      // strategy, background sync for offline ratings) is under our
      // control rather than Workbox's generated defaults.
      manifest: false,
      injectManifest: {
        injectionPoint: 'self.__WB_MANIFEST',
      },
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifestFilename: 'manifest.json',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png', 'offline.html'],
    }),
  ],
})
