import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconArrowLeft, IconClock, IconMapPin, IconCoin, IconStarFilled, IconStar, IconUserCircle } from '@tabler/icons-react'

const FACES = {
  1: { emoji: '😞', label: 'Completely missed the mark' },
  2: { emoji: '😕', label: 'Not quite what I expected' },
  3: { emoji: '😐', label: 'It was okay' },
  4: { emoji: '😊', label: 'Pretty good match' },
  5: { emoji: '🤩', label: 'Perfect match — exactly my vibe' },
}

export default function PlaceCard({ place, selectedBudget, previousRating, onBack, onRate, onSkipRating }) {
  const [rating, setRating] = useState(previousRating?.rating ?? 0)
  const [submitted, setSubmitted] = useState(Boolean(previousRating?.rating))
  const [skipped, setSkipped] = useState(previousRating?.skipped ?? false)

  const face = rating ? FACES[rating] : null

  const handleSubmit = () => {
    onRate(place.id, rating)
    setSubmitted(true)
  }

  const handleSkip = () => {
    onSkipRating(place.id)
    setSkipped(true)
  }

  return (
    <div className="h-full w-full bg-offwhite overflow-y-auto">
      <div className="px-6 pt-8 pb-10">
        <button onClick={onBack} className="mb-5 tap-highlight-none" aria-label="Back">
          <IconArrowLeft size={22} className="text-terracotta-dark" stroke={1.75} />
        </button>

        <p className="font-sans text-[11px] uppercase tracking-wide font-bold text-terracotta mb-1.5">
          {place.type} · {place.category}
        </p>
        <h1 className="font-serif text-terracotta-dark text-[26px] leading-tight mb-1.5">{place.name}</h1>

        <div className="flex items-center gap-1.5 mb-4">
          <IconUserCircle size={14} className="text-terracotta-dark/40 shrink-0" stroke={1.75} />
          <p className="font-sans text-[11.5px] text-terracotta-dark/50 italic">{place.localAttribution}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {place.essence.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-terracotta text-cream px-2.5 py-0.5 font-sans text-[10.5px] font-bold"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="font-sans text-[14px] text-terracotta-dark/80 leading-relaxed mb-5">{place.desc}</p>

        <div className="rounded-card bg-cream border-l-4 border-terracotta px-4 py-3.5 mb-5">
          <p className="font-serif italic text-[13.5px] text-terracotta-dark leading-relaxed">{place.story}</p>
        </div>

        <div className="rounded-card border-[0.5px] border-border bg-white divide-y divide-border mb-5">
          <InfoRow Icon={IconClock} label="Best time" value={place.bestTime} />
          <InfoRow Icon={IconMapPin} label="Getting there" value={place.gettingThere} />
          <InfoRow Icon={IconCoin} label="Budget" value={place.budget[selectedBudget]} />
        </div>

        <div className="rounded-card bg-cream border-l-4 border-terracotta px-4 py-3.5 mb-8">
          <p className="font-sans text-[11px] font-bold text-terracotta-dark/60 mb-1">Locals go here when</p>
          <p className="font-serif italic text-[13.5px] text-terracotta-dark leading-relaxed">
            &ldquo;{place.localContext}&rdquo;
          </p>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="confirmed"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="rounded-card bg-forest text-cream px-4 py-4 text-center overflow-hidden"
            >
              <p className="font-sans text-[13.5px] font-bold">
                🌟 Noted — your trail gets smarter with every visit
              </p>
            </motion.div>
          ) : skipped ? (
            <motion.div
              key="skipped"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="rounded-card bg-gray-200 text-gray-600 px-4 py-4 text-center overflow-hidden"
            >
              <p className="font-sans text-[13.5px] font-bold">No worries — it stays on your trail for next time</p>
            </motion.div>
          ) : (
            <motion.div key="rating" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="font-sans font-bold text-[14px] text-terracotta-dark text-center mb-3">
                Did you visit? Rate the match
              </p>

              <AnimatePresence mode="wait">
                {face && (
                  <motion.div
                    key={rating}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    className="flex flex-col items-center mb-2"
                  >
                    <span style={{ fontSize: 32 }}>{face.emoji}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setRating(n)} className="tap-highlight-none" aria-label={`${n} star`}>
                    {n <= rating ? (
                      <IconStarFilled size={30} className="text-terracotta" />
                    ) : (
                      <IconStar size={30} className="text-terracotta" stroke={1.75} />
                    )}
                  </button>
                ))}
              </div>

              {face && (
                <p className="font-sans text-[13px] text-terracotta text-center mb-4">{face.label}</p>
              )}

              <AnimatePresence>
                {rating > 0 && (
                  <motion.button
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 24, opacity: 0 }}
                    onClick={handleSubmit}
                    className="w-full rounded-full py-3.5 font-sans font-bold text-[15px] bg-forest text-cream tap-highlight-none mb-3"
                  >
                    Submit rating
                  </motion.button>
                )}
              </AnimatePresence>

              <button
                onClick={handleSkip}
                className="w-full text-center font-sans text-[13px] text-terracotta-dark/50 tap-highlight-none"
              >
                I didn&rsquo;t visit this place →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function InfoRow({ Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3.5">
      <Icon size={17} className="text-terracotta shrink-0 mt-0.5" stroke={1.75} />
      <div>
        <p className="font-sans text-[11px] font-bold text-terracotta-dark/50 mb-0.5">{label}</p>
        <p className="font-sans text-[13px] text-terracotta-dark leading-snug">{value}</p>
      </div>
    </div>
  )
}
