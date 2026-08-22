import { motion } from 'framer-motion'
import { IconHome, IconHomeFilled, IconHeart, IconHeartFilled, IconUser, IconUserFilled } from '@tabler/icons-react'

const TABS = [
  { id: 'discover', label: 'Discover', Icon: IconHome, IconFilled: IconHomeFilled },
  { id: 'saved', label: 'Saved', Icon: IconHeart, IconFilled: IconHeartFilled },
  { id: 'profile', label: 'Profile', Icon: IconUser, IconFilled: IconUserFilled },
]

export default function BottomTabBar({ active, onChange }) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-offwhite border-t border-border flex items-stretch px-2 pb-[max(env(safe-area-inset-bottom),8px)] pt-1 z-30">
      {TABS.map((tab) => {
        const isActive = active === tab.id
        const Icon = isActive ? tab.IconFilled : tab.Icon
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            aria-label={tab.label}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 tap-highlight-none"
          >
            <motion.div
              animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Icon size={24} color={isActive ? '#C17D3C' : '#B79A87'} stroke={1.75} />
            </motion.div>
            {isActive && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="text-[11px] font-sans text-terracotta font-bold"
              >
                {tab.label}
              </motion.span>
            )}
          </button>
        )
      })}
    </nav>
  )
}
