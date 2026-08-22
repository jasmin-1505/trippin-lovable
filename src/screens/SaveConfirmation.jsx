import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function SaveConfirmation({ city = 'Jaipur', onBack }) {
  const iconRef = useRef(null)

  useEffect(() => {
    if (!iconRef.current) return
    const rect = iconRef.current.getBoundingClientRect()
    confetti({
      particleCount: 120,
      spread: 100,
      startVelocity: 35,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ['#C17D3C', '#2D6A4F', '#E8C89A', '#E63946'],
    })
  }, [])

  return (
    <div className="h-full w-full bg-cream flex flex-col items-center justify-center px-8 text-center">
      <motion.div
        ref={iconRef}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
        className="text-6xl mb-6"
      >
        ✅
      </motion.div>
      <h1 className="font-serif text-terracotta-dark text-[24px] mb-2">Trail saved!</h1>
      <p className="font-sans text-[14px] text-terracotta-dark/70 mb-8 max-w-[260px]">
        Your {city} trail is saved. Access it anytime, even offline.
      </p>
      <button
        onClick={onBack}
        className="rounded-full px-8 py-3.5 font-sans font-bold text-[15px] bg-terracotta text-cream tap-highlight-none"
      >
        Back to trail
      </button>
    </div>
  )
}
