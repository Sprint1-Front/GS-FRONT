export default function DepthIndicator({ progress }: { progress: number, zone: any }) {
  const depth = Math.round(progress * 11000)
  const label = depth >= 1000 ? (depth / 1000).toFixed(1) + " km" : depth + " m"

  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
      <span className="text-white/60 text-xs font-mono">{label}</span>
      <div className="w-0.5 h-32 bg-white/20 rounded-full overflow-hidden">
        <div
          className="w-full bg-white/70 rounded-full transition-all duration-100"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
      <span className="text-white/30 text-xs font-mono">11km</span>
    </div>
  )
}