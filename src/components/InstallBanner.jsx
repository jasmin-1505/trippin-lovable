import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconDeviceMobile, IconX } from '@tabler/icons-react'
import { storage } from '../lib/storage'

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [dismissed, setDismissed] = useState(storage.getInstallDismissed())
  const [isStandalone] = useState(() => window.matchMedia('(display-mode: standalone)').matches)

  useEffect(() => {
    const onBeforeInstall = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setDismissed(true)
    storage.setInstallDismissed(true)
  }

  if (isStandalone || dismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="overflow-hidden"
      >
        <div className="mx-4 mt-3 mb-1 rounded-card bg-cream border-[0.5px] border-border px-3 py-2.5 flex items-center gap-2">
          <IconDeviceMobile size={20} className="shrink-0 text-terracotta-dark" stroke={1.75} />
          <p className="flex-1 text-[12px] leading-snug text-terracotta-dark">
            Add trippin&rsquo; to your home screen for offline access
          </p>
          <button
            onClick={handleInstall}
            className="shrink-0 bg-terracotta text-cream text-[12px] font-bold rounded-full px-3 py-1.5 tap-highlight-none"
          >
            Install
          </button>
          <button onClick={handleDismiss} className="shrink-0 p-1 tap-highlight-none" aria-label="Dismiss">
            <IconX size={16} className="text-terracotta-dark" stroke={2} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
