import { useEffect, useState } from 'react'
import { IconWifiOff } from '@tabler/icons-react'

export default function OfflineBanner({ hasSavedTrail }) {
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  if (online || !hasSavedTrail) return null

  return (
    <div className="flex items-center gap-1.5 bg-gray-200 text-gray-600 text-[11px] px-4 py-1.5">
      <IconWifiOff size={13} stroke={2} />
      <span>You&rsquo;re offline &mdash; showing your saved trail</span>
    </div>
  )
}
