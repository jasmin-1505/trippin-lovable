import { useState } from 'react'
import { BUDGET_OPTIONS } from '../data/drilldown'

function RupeeIndicator({ level }) {
  return (
    <span className="font-sans text-[20px] font-bold tracking-tight shrink-0">
      {[1, 2, 3].map((i) => (
        <span key={i} className={i <= level ? 'text-terracotta' : 'text-[#E8C89A]'}>
          ₹
        </span>
      ))}
    </span>
  )
}

export default function BudgetFilter({ onGenerate }) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="h-full w-full bg-offwhite flex flex-col px-6 py-10">
      <h1 className="font-serif text-terracotta-dark text-[24px] mb-6 leading-snug">What&rsquo;s your budget today?</h1>

      <div className="flex flex-col gap-3 mb-auto">
        {BUDGET_OPTIONS.map((opt) => {
          const isSelected = selected === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`w-full rounded-card border-[0.5px] px-4 py-4 flex items-center justify-between gap-3 tap-highlight-none transition-colors ${
                isSelected ? 'border-terracotta bg-cream' : 'border-border bg-white'
              }`}
            >
              <div className="text-left">
                <p className="font-sans font-bold text-[15px] text-terracotta-dark">{opt.label}</p>
                <p className="font-sans text-[12px] text-terracotta-dark/50 mt-0.5">{opt.sublabel}</p>
                <p className="font-sans text-[12px] text-terracotta font-bold mt-1.5">{opt.price}</p>
              </div>
              <RupeeIndicator level={opt.rupees} />
            </button>
          )
        })}
      </div>

      <button
        onClick={() => selected && onGenerate(selected)}
        disabled={!selected}
        className="w-full rounded-full py-3.5 font-sans font-bold text-[15px] bg-forest text-cream tap-highlight-none mt-8 disabled:opacity-40"
      >
        Generate my trail →
      </button>
    </div>
  )
}
