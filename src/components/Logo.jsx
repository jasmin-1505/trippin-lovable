// Squiggly wander-path mark with a dot at the end, in terracotta.
export default function Logo({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 46 C14 26, 20 54, 30 34 C38 18, 44 34, 52 20"
        stroke="#C17D3C"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="54" cy="17" r="4.5" fill="#C17D3C" />
    </svg>
  )
}
