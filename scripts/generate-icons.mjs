import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'icons')
mkdirSync(outDir, { recursive: true })

// Squiggly wander-path icon with a dot at the end, in terracotta, on a warm
// cream field — matches the trippin' logo mark used across the app.
function svg(size) {
  // Padded generously so the same file is safe as both a regular and a
  // maskable icon (manifest.json reuses icon-512.png for both purposes).
  const pad = size * 0.2
  const s = size - pad * 2
  const cream = '#FDF0E0'
  const terracotta = '#C17D3C'
  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${cream}"/>
  <g transform="translate(${pad},${pad})">
    <path d="M ${s * 0.08} ${s * 0.75}
             C ${s * 0.22} ${s * 0.4}, ${s * 0.3} ${s * 0.95}, ${s * 0.48} ${s * 0.55}
             C ${s * 0.62} ${s * 0.22}, ${s * 0.72} ${s * 0.55}, ${s * 0.82} ${s * 0.3}"
          fill="none" stroke="${terracotta}" stroke-width="${s * 0.09}"
          stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${s * 0.86}" cy="${s * 0.22}" r="${s * 0.075}" fill="${terracotta}"/>
  </g>
</svg>`
}

const targets = [
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
]

for (const t of targets) {
  const buf = Buffer.from(svg(t.size))
  await sharp(buf).png().toFile(path.join(outDir, t.file))
  console.log('wrote', t.file)
}
