import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconArrowLeft, IconDice5 } from '@tabler/icons-react'

export default function FunCorner({ picks, onShuffle, onOpenPlace, onBack }) {
  const [flipping, setFlipping] = useState(false)

  const handleShuffle = () => {
    setFlipping(true)
    setTimeout(() => {
      onShuffle()
      setFlipping(false)
    }, 200)
  }

  return (
    <div className="h-full w-full bg-offwhite overflow-y-auto px-6 py-8">
      <button onClick={onBack} className="mb-5 tap-highlight-none" aria-label="Back">
        <IconArrowLeft size={22} className="text-terracotta-dark" stroke={1.75} />
      </button>

      <div className="flex items-start justify-between mb-1">
        <h1 className="font-serif text-terracotta-dark text-[24px] leading-tight">Outside your usual vibe</h1>
        <button
          onClick={handleShuffle}
          className="shrink-0 flex items-center gap-1.5 rounded-full border-[0.5px] border-border bg-white px-3 py-2 font-sans text-[12px] font-bold text-terracotta-dark tap-highlight-none"
        >
          <IconDice5 size={16} className="text-terracotta" stroke={1.75} />
          Shuffle again
        </button>
      </div>
      <p className="font-sans text-[13px] text-terracotta-dark/50 mb-6">
        Part random, part you — refreshes every time.
      </p>

      <div className="flex flex-col gap-4 mb-6">
        <AnimatePresence mode="wait">
          {!flipping && (
            <motion.div
              key={picks.map((p) => p.id).join('-')}
              className="flex flex-col gap-4"
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {picks.map((place) => (
                <button
                  key={place.id}
                  onClick={() => onOpenPlace(place.id, 'funcorner')}
                  className="text-left rounded-card border-2 border-error/60 bg-white overflow-hidden tap-highlight-none relative"
                >
                  <span className="absolute top-3 right-3 rounded-full bg-error text-white text-[10px] font-bold px-2 py-0.5 flex items-center gap-1">
                    🎲 wildcard
                  </span>
                  <div className="px-4 py-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-2xl">{place.emoji}</span>
                      <p className="font-serif text-[17px] text-terracotta-dark">{place.name}</p>
                    </div>
                    <p className="font-sans text-[12.5px] text-terracotta-dark/70 leading-snug mb-2.5">
                      {place.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {place.essence.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-terracotta text-cream px-2.5 py-0.5 font-sans text-[10.5px] font-bold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="font-serif italic text-[12.5px] text-terracotta-dark/70">
                      &ldquo;{place.localContext}&rdquo;
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button onClick={onBack} className="font-sans text-[13px] text-terracotta-dark/60 tap-highlight-none">
        ← Back to my trail
      </button>
    </div>
  )
}
