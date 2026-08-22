import Logo from './Logo'

export default function OfflineFullScreen({ onRetry }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-cream px-8 text-center">
      <Logo size={64} className="mb-5" />
      <div className="font-serif italic text-terracotta text-lg mb-8">trippin&rsquo;</div>
      <h1 className="font-serif text-2xl text-terracotta-dark mb-2">You&rsquo;re offline</h1>
      <p className="text-sm text-terracotta-dark/80 mb-6 max-w-[240px]">
        Save a trail first to access it here.
      </p>
      <button
        onClick={onRetry}
        className="bg-terracotta text-cream font-sans font-bold rounded-full px-8 py-3.5 tap-highlight-none"
      >
        Retry
      </button>
    </div>
  )
}
