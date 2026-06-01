export default function ScrollProgress({ progress }: { progress: number }) {
  const depth = Math.round(progress * 110) // 0m a 11000m (fossa das Marianas)

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-50">
      <span className="text-white/60 text-xs font-mono">{depth}m</span>
      <div className="w-1 h-40 bg-white/20 rounded-full overflow-hidden">
        <div
          className="w-full bg-foam rounded-full transition-all"
          style={{ height: `${progress}%` }}
        />
      </div>
      <span className="text-white/40 text-xs font-mono">↓</span>
    </div>
  )
}