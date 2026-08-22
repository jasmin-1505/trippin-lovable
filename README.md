# trippin&rsquo;

A personality-driven city discovery PWA for travellers, built with React, Tailwind CSS, and Vite.

## Stack

- React + Vite, single `App.jsx` state machine for routing between the 13 screens
- Tailwind CSS for the design system (terracotta/cream palette, Georgia + Arial type)
- `vite-plugin-pwa` (injectManifest strategy) with a hand-authored service worker
  (`src/sw.js`) — cache-first for the app shell, offline fallback, background sync
  for star ratings made while offline
- `framer-motion` for screen transitions and micro-interactions, `canvas-confetti`
  for the save/trail-saved bursts, `@tabler/icons-react` for UI chrome icons

## Development

```bash
npm install
npm run dev       # dev server with PWA devOptions enabled
npm run build     # production build (dist/) incl. manifest.json + sw.js
npm run preview   # serve the production build locally
```

## Structure

- `src/data/places.js` &mdash; the 12-place Jaipur database
- `src/data/drilldown.js` &mdash; drill-down question bank, trait map, budget tiers
- `src/lib/matchingEngine.js` &mdash; `getTrail()` and `getFunCorner()`
- `src/lib/storage.js` &mdash; localStorage persistence (profile, consent, saved trail, ratings)
- `src/screens/` &mdash; one component per screen
- `src/components/` &mdash; shared chrome (phone frame, bottom tab bar, banners, etc.)
- `public/manifest.json`, `public/offline.html`, `src/sw.js` &mdash; PWA layer
- `scripts/generate-icons.mjs` &mdash; regenerates `public/icons/icon-{192,512}.png`
