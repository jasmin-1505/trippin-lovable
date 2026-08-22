import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconMapPin } from '@tabler/icons-react'

const SUGGESTIONS = ['Jaipur', 'Udaipur', 'Varanasi', 'Mysore']

export default function CityEntry({ name, onExplore, onToast }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [selectedCity, setSelectedCity] = useState(null)

  const filtered = SUGGESTIONS.filter((c) => c.toLowerCase().includes(query.toLowerCase()))

  const pick = (city) => {
    setQuery(city)
    setSelectedCity(city)
    setFocused(false)
  }

  const handleExplore = () => {
    const city = selectedCity || query
    if (city === 'Jaipur') {
      onExplore()
    } else if (city) {
      onToast(`${city} — Coming soon`)
    }
  }

  return (
    <div className="h-full w-full bg-offwhite flex flex-col px-6 py-10">
      <h1 className="font-serif text-terracotta-dark text-[22px] mb-6 leading-snug">
        Where are you headed, {name || 'traveller'}?
      </h1>

      <div className="relative mb-1">
        <div className="flex items-center gap-2 rounded-card border-[0.5px] border-border bg-white px-4 py-3.5">
          <IconMapPin size={18} className="text-terracotta shrink-0" stroke={1.75} />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedCity(null)
            }}
            onFocus={() => setFocused(true)}
            placeholder="Search a city"
            className="flex-1 outline-none font-sans text-[15px] text-terracotta-dark bg-transparent"
          />
        </div>

        <AnimatePresence>
          {focused && query && filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="absolute left-0 right-0 top-[110%] bg-white rounded-card border-[0.5px] border-border overflow-hidden z-10 shadow-lg"
            >
              {filtered.map((c) => (
                <button
                  key={c}
                  onClick={() => pick(c)}
                  className="w-full text-left px-4 py-3 font-sans text-[14px] text-terracotta-dark tap-highlight-none border-b border-border last:border-0"
                >
                  {c}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="font-sans text-[12px] font-bold text-terracotta-dark/50 mt-8 mb-3">Popular right now</p>
      <div className="flex flex-wrap gap-2 mb-10">
        {SUGGESTIONS.map((c) => (
          <button
            key={c}
            onClick={() => pick(c)}
            className={`rounded-full px-4 py-2 font-sans text-[13px] font-bold tap-highlight-none border-[0.5px] transition-colors ${
              selectedCity === c
                ? 'bg-terracotta text-cream border-terracotta'
                : 'bg-cream text-terracotta-dark border-border'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <button
        onClick={handleExplore}
        disabled={!query}
        className="w-full rounded-full py-3.5 font-sans font-bold text-[15px] bg-terracotta text-cream tap-highlight-none mt-auto disabled:opacity-40"
      >
        Explore {query || 'a city'} →
      </button>
    </div>
  )
}
