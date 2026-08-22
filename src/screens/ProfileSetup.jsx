import { useState } from 'react'
import { IconBackpack, IconHomeFilled } from '@tabler/icons-react'
import Logo from '../components/Logo'

export default function ProfileSetup({ initialProfile, onContinue, onSkip }) {
  const [name, setName] = useState(initialProfile?.name ?? '')
  const [type, setType] = useState(initialProfile?.type ?? 'Traveller')

  return (
    <div className="h-full w-full bg-offwhite flex flex-col px-6 py-10">
      <Logo size={40} />
      <h1 className="font-serif text-terracotta-dark text-[22px] mt-5 mb-6">Tell us a little about you</h1>

      <label className="font-sans text-[12px] font-bold text-terracotta-dark/60 mb-1.5">Your name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Asha"
        className="w-full rounded-card border-[0.5px] border-border bg-white px-4 py-3.5 font-sans text-[15px] text-terracotta-dark mb-6 outline-none focus:border-terracotta"
      />

      <p className="font-sans text-[12px] font-bold text-terracotta-dark/60 mb-2">I&rsquo;m a&hellip;</p>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {[
          { key: 'Traveller', Icon: IconBackpack },
          { key: 'Local', Icon: IconHomeFilled },
        ].map(({ key, Icon }) => {
          const selected = type === key
          return (
            <button
              key={key}
              onClick={() => setType(key)}
              className={`rounded-card border-[0.5px] py-5 flex flex-col items-center gap-2 tap-highlight-none transition-colors ${
                selected ? 'border-terracotta bg-cream' : 'border-border bg-white'
              }`}
            >
              <Icon size={26} color={selected ? '#C17D3C' : '#B79A87'} stroke={1.75} />
              <span
                className={`font-sans font-bold text-[14px] ${
                  selected ? 'text-terracotta-dark' : 'text-terracotta-dark/50'
                }`}
              >
                {key}
              </span>
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onContinue({ name: name.trim() || 'traveller', type })}
        className="w-full rounded-full py-3.5 font-sans font-bold text-[15px] bg-terracotta text-cream tap-highlight-none mt-auto"
      >
        Start exploring →
      </button>
      <button onClick={onSkip} className="w-full py-3 font-sans text-[13px] text-terracotta-dark/60 tap-highlight-none">
        Skip for now
      </button>
    </div>
  )
}
