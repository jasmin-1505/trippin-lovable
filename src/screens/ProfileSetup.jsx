import { useState } from 'react'
import Logo from '../components/Logo'

const GENDER_OPTIONS = ['Woman', 'Man', 'Non-binary', 'Prefer not to say']

export default function ProfileSetup({ initialProfile, onContinue, onSkip }) {
  const [name, setName] = useState(initialProfile?.name ?? '')
  const [age, setAge] = useState(initialProfile?.age ?? '')
  const [gender, setGender] = useState(initialProfile?.gender ?? '')

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

      <label className="font-sans text-[12px] font-bold text-terracotta-dark/60 mb-1.5">Your age</label>
      <input
        value={age}
        onChange={(e) => setAge(e.target.value.replace(/[^0-9]/g, ''))}
        inputMode="numeric"
        placeholder="e.g. 27"
        className="w-full rounded-card border-[0.5px] border-border bg-white px-4 py-3.5 font-sans text-[15px] text-terracotta-dark mb-6 outline-none focus:border-terracotta"
      />

      <p className="font-sans text-[12px] font-bold text-terracotta-dark/60 mb-2">Gender</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {GENDER_OPTIONS.map((g) => {
          const selected = gender === g
          return (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`rounded-full px-4 py-2 font-sans text-[13px] font-bold tap-highlight-none border-[0.5px] transition-colors ${
                selected
                  ? 'bg-terracotta text-cream border-terracotta'
                  : 'bg-white text-terracotta-dark/60 border-border'
              }`}
            >
              {g}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onContinue({ name: name.trim() || 'traveller', age, gender })}
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
