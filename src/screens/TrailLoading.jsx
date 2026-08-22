import { useEffect, useState } from 'react'
import Logo from '../components/Logo'

export default function TrailLoading({ city = 'Jaipur', onDone }) {
  const [dots, setDots] = useState(1)

  useEffect(() => {
    const dotInterval = setInterval(() => setDots((d) => (d % 3) + 1), 300)
    const timeout = setTimeout(onDone, 1500)
    return () => {
      clearInterval(dotInterval)
      clearTimeout(timeout)
    }
  }, [onDone])

  return (
    <div className="h-full w-full bg-cream flex flex-col items-center justify-center px-8">
      <Logo size={56} className="mb-6 animate-select-bounce" />
      <p className="font-serif text-terracotta-dark text-[18px]">
        Finding your {city}
        {'.'.repeat(dots)}
      </p>
    </div>
  )
}
