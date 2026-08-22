import confetti from 'canvas-confetti'
import { IconClock, IconDice5 } from '@tabler/icons-react'
import { traitToLabel, BUDGET_OPTIONS } from '../data/drilldown'

const ANSWER_ORDER = ['q1', 'q2', 'q3', 'q4', 'q5']

export default function TrailScreen({ trail, answers, budget, onOpenPlace, onShowFunCorner, onSave }) {
  const budgetLabel = BUDGET_OPTIONS.find((b) => b.id === budget)?.label ?? ''
  const q1Label = traitToLabel(answers.q1)

  const handleSave = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: rect.top / window.innerHeight },
      colors: ['#C17D3C', '#2D6A4F', '#E8C89A', '#FDF0E0'],
    })
    onSave()
  }

  return (
    <div className="h-full w-full bg-offwhite relative">
      <div className="absolute inset-0 overflow-y-auto pb-[176px]">
        <div className="px-6 pt-8 pb-4">
          <h1 className="font-serif text-terracotta-dark text-[22px] mb-3">Your Jaipur trail</h1>

          <div className="rounded-card bg-forest text-cream px-4 py-2.5 mb-3">
            <p className="font-sans text-[13px] font-bold">
              Matched to {q1Label} · {budgetLabel}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {ANSWER_ORDER.map((key) => (
              <span
                key={key}
                className="rounded-full bg-cream border-[0.5px] border-border px-3 py-1 font-sans text-[11px] text-terracotta-dark"
              >
                {traitToLabel(answers[key])}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {trail.map((place, i) => (
              <button
                key={place.id}
                onClick={() => onOpenPlace(place.id, 'trail')}
                className="text-left rounded-card border-[0.5px] border-border bg-white overflow-hidden tap-highlight-none"
              >
                <div
                  className={`px-4 py-3 flex items-center justify-between ${
                    i % 2 === 0 ? 'bg-cream' : 'bg-[#E8C89A]'
                  }`}
                >
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-wide text-terracotta-dark/60 font-bold">
                      {place.type}
                    </p>
                    <p className="font-serif text-[17px] text-terracotta-dark">{place.name}</p>
                  </div>
                  <span className="text-2xl">{place.emoji}</span>
                </div>
                <div className="px-4 py-3">
                  <p className="font-sans text-[12.5px] text-terracotta-dark/70 leading-snug mb-2.5">{place.desc}</p>
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
                  <div className="flex items-center gap-1.5 text-terracotta-dark/60">
                    <IconClock size={13} stroke={1.75} />
                    <span className="font-sans text-[11.5px]">{place.bestTime}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-card bg-gradient-to-br from-[#E63946] to-[#C17D3C] px-5 py-5 text-cream">
            <div className="flex items-center gap-2 mb-2">
              <IconDice5 size={20} stroke={1.75} />
              <p className="font-serif text-[17px]">Fun Corner</p>
              <span className="ml-auto rounded-full bg-white/20 px-2.5 py-0.5 font-sans text-[10px] font-bold">
                Outside your profile
              </span>
            </div>
            <p className="font-sans text-[12.5px] leading-snug mb-4 opacity-95">
              Part random, part you — two picks from outside your usual vibe, just to keep things interesting.
            </p>
            <button
              onClick={onShowFunCorner}
              className="rounded-full border border-cream/70 px-4 py-2 font-sans text-[12.5px] font-bold tap-highlight-none"
            >
              Show me the wildcards →
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 left-0 right-0 px-6 py-3 bg-offwhite/95 backdrop-blur border-t border-border">
        <button
          onClick={handleSave}
          className="w-full rounded-full py-3.5 font-sans font-bold text-[15px] bg-forest text-cream tap-highlight-none"
        >
          Save this trail
        </button>
      </div>
    </div>
  )
}
