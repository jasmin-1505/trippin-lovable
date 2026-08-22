import { PLACES } from '../data/places'

const FACTS = ['UNESCO heritage forts & palaces', 'Gem capital of India', 'Street food capital of Rajasthan']

const LENS_ORDER = ['Heritage', 'Arts & Craft', 'Food & Drinks', 'Slow Travel']
const LENS_TITLES = {
  Heritage: 'Things to do',
  'Arts & Craft': 'Things to buy',
  'Food & Drinks': 'Food & drinks',
  'Slow Travel': 'Third places',
}

export default function CitySnapshot({ onContinue }) {
  return (
    <div className="h-full w-full bg-offwhite flex flex-col px-6 py-8 overflow-y-auto">
      <div className="rounded-card bg-terracotta-dark text-cream px-5 py-6 mb-5">
        <p className="font-serif text-[24px] leading-tight">Jaipur</p>
        <p className="font-serif italic text-[15px] mt-1 opacity-90">The Pink City, Rajasthan</p>
      </div>

      <ul className="mb-5 flex flex-col gap-2">
        {FACTS.map((f) => (
          <li key={f} className="flex items-start gap-2 font-sans text-[13px] text-terracotta-dark">
            <span className="text-terracotta mt-0.5">•</span>
            {f}
          </li>
        ))}
      </ul>

      <div className="rounded-card bg-cream border-l-4 border-terracotta px-4 py-3 mb-6">
        <p className="font-sans text-[13px] text-terracotta-dark leading-snug">
          <strong>Local tip:</strong> Best explored before 9am — the old city comes alive at sunrise before crowds
          arrive.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {LENS_ORDER.map((cat) => {
          const places = PLACES.filter((p) => p.category === cat).slice(0, 5)
          return (
            <div key={cat} className="rounded-card border-[0.5px] border-border bg-white p-3.5">
              <p className="font-sans font-bold text-[13px] text-terracotta-dark mb-2">{LENS_TITLES[cat]}</p>
              <div className="flex flex-col gap-1">
                {places.map((p) => (
                  <p key={p.id} className="font-sans text-[11.5px] text-terracotta-dark/60 truncate">
                    {p.emoji} {p.name}
                  </p>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <button
        onClick={onContinue}
        className="w-full rounded-full py-3.5 font-sans font-bold text-[15px] bg-terracotta text-cream tap-highlight-none"
      >
        Find my kind of Jaipur →
      </button>
    </div>
  )
}
