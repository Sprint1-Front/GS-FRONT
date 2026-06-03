export default function Floor({ progress }: { progress: number }) {
  const opacity = progress > 0.82 ? Math.min(1, (progress - 0.82) * 8) : 0

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      {/* fundo rochoso */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 160" preserveAspectRatio="none" style={{ width: "100%", height: 160 }}>
          <path
            fill="#0a0e14"
            d="M0,160 L0,100 C80,80 160,120 240,95 C320,70 400,110 480,90 C560,70 640,105 720,88 C800,70 880,108 960,92 C1040,76 1120,100 1200,85 L1200,160 Z"
          />
          <path
            fill="#060a0f"
            d="M0,160 L0,130 C100,115 200,140 300,125 C400,110 500,138 600,120 C700,102 800,135 900,118 C1000,101 1100,128 1200,115 L1200,160 Z"
          />
        </svg>
      </div>

      {/* rochas e sedimento */}
      <div className="absolute bottom-0 left-0 right-0 h-20 flex items-end justify-around px-8 pb-4">
        {[
          { w: 28, h: 18, rx: 4 },
          { w: 16, h: 12, rx: 3 },
          { w: 40, h: 24, rx: 5 },
          { w: 20, h: 14, rx: 4 },
          { w: 32, h: 20, rx: 4 },
          { w: 14, h: 10, rx: 3 },
          { w: 36, h: 22, rx: 5 },
          { w: 18, h: 13, rx: 3 },
        ].map((r, i) => (
          <div
            key={i}
            style={{
              width: r.w,
              height: r.h,
              borderRadius: r.rx,
              background: `hsl(220, 15%, ${8 + (i % 3) * 3}%)`,
              marginBottom: i % 2 === 0 ? 0 : 4,
            }}
          />
        ))}
      </div>

      {/* texto final */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ opacity: progress > 0.92 ? Math.min(1, (progress - 0.92) * 12) : 0 }}
      >
        <p
          className="text-white/20 text-xs tracking-widest uppercase"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          11.000 metros de profundidade
        </p>
        <p
          className="text-white/10 text-xs tracking-widest uppercase mt-2"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Fossa das Marianas
        </p>
      </div>
    </div>
  )
}