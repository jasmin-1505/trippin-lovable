import { IconCheck } from '@tabler/icons-react'

export default function Checkbox({ checked, onChange, children }) {
  return (
    <label className="flex items-start gap-2.5 tap-highlight-none cursor-pointer">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`shrink-0 mt-0.5 w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center transition-colors ${
          checked ? 'bg-terracotta border-terracotta' : 'bg-transparent border-border'
        }`}
      >
        {checked && <IconCheck size={13} color="white" stroke={3} />}
      </button>
      <span className="text-[13px] font-sans text-terracotta-dark leading-snug">{children}</span>
    </label>
  )
}
