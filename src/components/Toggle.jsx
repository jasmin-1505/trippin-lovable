import { motion } from 'framer-motion'

export default function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`shrink-0 w-11 h-6 rounded-full p-0.5 flex tap-highlight-none transition-colors duration-300 ${
        checked ? 'bg-terracotta' : 'bg-[#E8C89A]'
      }`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-5 h-5 rounded-full bg-white shadow"
        style={{ marginLeft: checked ? 'auto' : 0 }}
      />
    </button>
  )
}
