import { useState } from 'react'
import { IconBrandGoogleFilled, IconBrandApple, IconBrandWhatsapp } from '@tabler/icons-react'
import Logo from '../components/Logo'
import Checkbox from '../components/Checkbox'

export default function Splash({ onContinue, onSkipGuest }) {
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreeAge, setAgreeAge] = useState(false)
  const [error, setError] = useState(false)

  const bothChecked = agreeTerms && agreeAge

  const requireChecks = (action) => {
    if (!bothChecked) {
      setError(true)
      return
    }
    setError(false)
    action()
  }

  const handleTap = (provider) => requireChecks(() => onContinue(provider))
  const handleSkip = () => requireChecks(onSkipGuest)

  return (
    <div className="h-full w-full bg-cream flex flex-col items-center justify-between px-8 py-14 text-center">
      <div className="flex-1 flex flex-col items-center justify-center">
        <Logo size={72} />
        <h1 className="font-serif text-terracotta text-[32px] mt-4">trippin&rsquo;</h1>
        <p className="font-serif italic text-terracotta-dark/80 text-[15px] mt-2">Wander with intent</p>
      </div>

      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-col gap-2.5 mb-1 text-left">
          <Checkbox checked={agreeTerms} onChange={setAgreeTerms}>
            I agree to the{' '}
            <button type="button" className="underline underline-offset-2" onClick={(e) => e.stopPropagation()}>
              Terms &amp; Conditions
            </button>{' '}
            and{' '}
            <button type="button" className="underline underline-offset-2" onClick={(e) => e.stopPropagation()}>
              Privacy Policy
            </button>
          </Checkbox>
          <Checkbox checked={agreeAge} onChange={setAgreeAge}>
            I confirm I am 13 years of age or older
          </Checkbox>
        </div>

        {error && (
          <p className="text-error text-[12px] font-sans -mt-1 mb-1 text-left">
            Please confirm both before continuing
          </p>
        )}

        <button
          onClick={() => handleTap('google')}
          className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 font-sans font-bold text-[15px] bg-white border border-border text-terracotta-dark tap-highlight-none"
        >
          <IconBrandGoogleFilled size={18} />
          Sign up with Google
        </button>
        <button
          onClick={() => handleTap('apple')}
          className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 font-sans font-bold text-[15px] bg-white border border-border text-terracotta-dark tap-highlight-none"
        >
          <IconBrandApple size={18} />
          Sign up with Apple
        </button>
        <button
          onClick={() => handleTap('whatsapp')}
          className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 font-sans font-bold text-[15px] bg-terracotta text-cream tap-highlight-none"
        >
          <IconBrandWhatsapp size={18} />
          Continue with WhatsApp
        </button>

        <button
          onClick={handleSkip}
          className="w-full py-2 font-sans text-[13px] font-bold text-terracotta-dark/60 tap-highlight-none"
        >
          Skip & explore as a guest →
        </button>
      </div>
    </div>
  )
}
