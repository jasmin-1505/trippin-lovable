import InstallBanner from '../components/InstallBanner'
import { BUDGET_OPTIONS } from '../data/drilldown'

export default function SavedTab({ savedTrail, onOpenTrail }) {
  const budgetLabel = savedTrail ? BUDGET_OPTIONS.find((b) => b.id === savedTrail.budget)?.label : null

  return (
    <div className="h-full w-full bg-offwhite relative">
      <div className="absolute inset-0 overflow-y-auto pb-20">
        <InstallBanner />

        <div className="px-6 pt-6">
          <h1 className="font-serif text-terracotta-dark text-[22px] mb-4">My saved trails</h1>

          {savedTrail ? (
            <button
              onClick={onOpenTrail}
              className="w-full text-left rounded-card border-[0.5px] border-border bg-white p-4 tap-highlight-none"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-serif text-[18px] text-terracotta-dark">{savedTrail.city}</p>
                <span className="font-sans text-[11px] text-terracotta-dark/50">{savedTrail.date}</span>
              </div>
              <p className="font-sans text-[12.5px] text-terracotta-dark/60 mb-3">
                {savedTrail.places.length} places · {budgetLabel}
              </p>
              <div className="flex gap-1.5">
                {savedTrail.places.map((p) => (
                  <span
                    key={p.id}
                    className="w-8 h-8 rounded-full bg-cream border-[0.5px] border-border flex items-center justify-center text-base"
                  >
                    {p.emoji}
                  </span>
                ))}
              </div>
            </button>
          ) : (
            <div className="rounded-card border-[0.5px] border-border bg-white px-5 py-10 text-center">
              <p className="font-sans text-[13.5px] text-terracotta-dark/50">
                No saved trails yet. Explore a city to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
