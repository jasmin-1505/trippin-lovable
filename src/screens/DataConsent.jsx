import { useState } from 'react'
import Toggle from '../components/Toggle'

const CARDS = [
  {
    key: 'location',
    title: 'Location',
    desc: 'To show you places near where you are right now. Never stored beyond your session unless you choose to save a trail.',
    label: 'Allow location',
  },
  {
    key: 'analytics',
    title: 'Usage data',
    desc: 'To understand which features you use so we can improve the app. Anonymous and never sold.',
    label: 'Allow analytics',
  },
  {
    key: 'personalisation',
    title: 'Personalisation',
    desc: 'To remember your drill-down profile and improve trail recommendations over time. Only used within trippin’.',
    label: 'Allow personalisation',
  },
]

export default function DataConsent({ onContinue }) {
  const [consent, setConsent] = useState({ location: false, analytics: false, personalisation: false })

  const toggle = (key, value) => setConsent((c) => ({ ...c, [key]: value }))

  const acceptSelected = () => onContinue(consent)
  const acceptAll = () => onContinue({ location: true, analytics: true, personalisation: true })

  return (
    <div className="h-full w-full bg-offwhite flex flex-col px-6 py-10 overflow-y-auto">
      <h1 className="font-serif text-terracotta-dark text-[24px] mb-2">Before we begin</h1>
      <p className="text-[13px] text-terracotta-dark/70 font-sans mb-6 leading-snug">
        trippin&rsquo; uses a few types of data to personalise your experience. Here&rsquo;s exactly what we collect
        and why.
      </p>

      <div className="flex flex-col gap-3 mb-3">
        {CARDS.map((card) => {
          const on = consent[card.key]
          return (
            <div
              key={card.key}
              className={`rounded-card border-[0.5px] border-border p-4 transition-colors duration-300 ${
                on ? 'bg-cream' : 'bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-sans font-bold text-[14px] text-terracotta-dark mb-1">{card.title}</p>
                  <p className="font-sans text-[13px] text-terracotta-dark/60 leading-snug">{card.desc}</p>
                </div>
                <Toggle checked={on} onChange={(v) => toggle(card.key, v)} />
              </div>
              <p className="font-sans text-[11px] text-terracotta-dark/50 mt-2">{card.label}</p>
            </div>
          )
        })}
      </div>

      <p className="text-[12px] text-terracotta-dark/50 font-sans mb-6">
        You can change these at any time in Settings.
      </p>

      <div className="mt-auto flex flex-col gap-2.5">
        <button
          onClick={acceptSelected}
          className="w-full rounded-full py-3.5 font-sans font-bold text-[15px] bg-terracotta text-cream tap-highlight-none"
        >
          Accept selected &amp; continue
        </button>
        <button
          onClick={acceptAll}
          className="w-full rounded-full py-3.5 font-sans font-bold text-[15px] bg-transparent text-terracotta-dark tap-highlight-none"
        >
          Accept all &amp; continue
        </button>
        <p className="text-[12px] text-terracotta-dark/50 font-sans text-center mt-2">
          trippin&rsquo; will never sell your data or show you ads.
        </p>
      </div>
    </div>
  )
}
