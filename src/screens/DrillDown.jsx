import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DRILLDOWN_QUESTIONS } from '../data/drilldown'

export default function DrillDown({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selectedTrait, setSelectedTrait] = useState(null)

  const step = DRILLDOWN_QUESTIONS[stepIndex]
  const percent = (stepIndex + 1) * 20

  const handleSelect = (trait) => {
    if (selectedTrait) return
    setSelectedTrait(trait)
    const nextAnswers = { ...answers, [step.id]: trait }
    setAnswers(nextAnswers)

    setTimeout(() => {
      if (stepIndex + 1 < DRILLDOWN_QUESTIONS.length) {
        setStepIndex((i) => i + 1)
        setSelectedTrait(null)
      } else {
        onComplete(nextAnswers)
      }
    }, 300)
  }

  return (
    <div className="h-full w-full bg-offwhite flex flex-col px-6 py-8">
      <div className="flex items-center gap-3 mb-1">
        <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
          <motion.div
            className="h-full bg-terracotta rounded-full"
            animate={{ width: `${percent}%` }}
            transition={{ type: 'tween', duration: 0.35 }}
          />
        </div>
        <span className="font-sans text-[11px] font-bold text-terracotta shrink-0">{percent}% personalised</span>
      </div>
      <p className="font-sans text-[12px] text-terracotta-dark/50 mb-5">Step {stepIndex + 1} of 5</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
        >
          <h1 className="font-serif text-terracotta-dark text-[24px] mb-6 leading-snug">{step.question}</h1>

          <div className="grid grid-cols-2 gap-3">
            {step.options.map((opt) => {
              const selected = selectedTrait === opt.trait
              return (
                <motion.button
                  key={opt.trait}
                  onClick={() => handleSelect(opt.trait)}
                  animate={selected ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-card border-[0.5px] py-6 px-3 flex flex-col items-center text-center gap-1.5 tap-highlight-none transition-colors ${
                    selected ? 'border-terracotta bg-cream' : 'border-border bg-white'
                  }`}
                >
                  <span className="text-3xl mb-1">{opt.emoji}</span>
                  <span className="font-sans font-bold text-[13px] text-terracotta-dark">{opt.label}</span>
                  <span className="font-sans text-[11px] text-terracotta-dark/50">{opt.hint}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="font-sans text-[12px] text-terracotta-dark/40 text-center mt-auto pt-8">
        Your trail gets more specific with each answer
      </p>
    </div>
  )
}
