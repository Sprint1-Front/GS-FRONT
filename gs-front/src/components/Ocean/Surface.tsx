export default function Surface({ progress }: { progress: number }) {
  const opacity = Math.max(0, 1 - progress * 6)

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      {/* ondas */}
      <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: 120 }}>
        <path fill="rgba(255,255,255,0.15)" d="M0,60 C300,20 600,100 900,60 C1050,40 1150,80 1200,60 L1200,0 L0,0 Z"/>
        <path fill="rgba(255,255,255,0.08)" d="M0,80 C200,50 500,110 800,70 C1000,45 1100,90 1200,75 L1200,0 L0,0 Z"/>
      </svg>

      {/* raios de luz */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 rounded-full"
          style={{
            left: `${15 + i * 14}%`,
            width: 2,
            height: `${35 + i % 2 * 15}%`,
            background: "rgba(255,255,255,0.06)",
            transform: `rotate(${-10 + i * 4}deg)`,
            transformOrigin: "top center",
          }}
        />
      ))}
    </div>
  )
}