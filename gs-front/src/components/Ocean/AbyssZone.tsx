import { useMemo } from "react"

export default function AbyssZone({ progress }: { progress: number }) {
  const opacity = progress > 0.6 ? Math.min(1, (progress - 0.6) * 5) : 0

  const particles = useMemo(() =>
    [...Array(20)].map((_, i) => ({
      x: Math.random() * 95,
      y: Math.random() * 95,
      size: 1 + Math.random() * 3,
      duration: 3 + Math.random() * 6,
      delay: Math.random() * 6,
      hue: [200, 220, 240][i % 3],
    })), []
  )

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      {/* partículas de neve marinha — detritos que caem devagar */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `hsla(${p.hue}, 40%, 80%, 0.4)`,
            animation: `snowfall ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}

      {/* vents hidrotermais — começam a aparecer no final */}
      {progress > 0.8 && (
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-24"
          style={{ opacity: Math.min(1, (progress - 0.8) * 8) }}
        >
          {[0, 1, 2].map(i => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="rounded-full"
                style={{
                  width: 4 + i * 2,
                  height: 60 + i * 20,
                  background: `rgba(180, 100, 50, ${0.15 + i * 0.05})`,
                  animation: `ventSmoke ${2 + i}s ease-in-out infinite alternate`,
                }}
              />
              <div
                className="rounded-sm"
                style={{
                  width: 20 + i * 8,
                  height: 14 + i * 4,
                  background: "#2a1a0a",
                  marginTop: 2,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}