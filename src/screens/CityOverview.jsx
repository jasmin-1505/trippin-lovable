import { useState } from 'react'
import { IconBolt, IconShoppingBag, IconToolsKitchen2, IconArmchair } from '@tabler/icons-react'
import { PLACES } from '../data/places'

const TABS = [
  { key: 'Do', category: 'Heritage', Icon: IconBolt },
  { key: 'Buy', category: 'Arts & Craft', Icon: IconShoppingBag },
  { key: 'Eat & Drink', category: 'Food & Drinks', Icon: IconToolsKitchen2 },
  { key: 'Chill', category: 'Slow Travel', Icon: IconArmchair },
]

export default function CityOverview({ onContinue }) {
  const [active, setActive] = useState('Do')
  const activeTab = TABS.find((t) => t.key === active)
  const places = PLACES.filter((p) => p.category === activeTab.category).slice(0, 5)

  return (
    <div className="h-full w-full bg-offwhite flex flex-col">
      <div className="flex px-4 pt-8 pb-2 gap-1">
        {TABS.map((tab) => {
          const isActive = tab.key === active
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-card tap-highlight-none transition-colors ${
                isActive ? 'bg-cream' : ''
              }`}
            >
              <tab.Icon size={20} color={isActive ? '#C17D3C' : '#B79A87'} stroke={1.75} />
              <span
                className={`font-sans text-[11px] font-bold ${
                  isActive ? 'text-terracotta' : 'text-terracotta-dark/50'
                }`}
              >
                {tab.key}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="flex flex-col gap-2">
          {places.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 rounded-card border-[0.5px] border-border bg-white px-4 py-3"
            >
              <span className="text-2xl">{p.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-sans font-bold text-[14px] text-terracotta-dark truncate">{p.name}</p>
                <p className="font-sans text-[11.5px] text-terracotta-dark/50 truncate">{p.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-8 pt-2">
        <button
          onClick={onContinue}
          className="w-full rounded-full py-3.5 font-sans font-bold text-[15px] bg-terracotta text-cream tap-highlight-none"
        >
          Personalise my trail →
        </button>
      </div>
    </div>
  )
}
