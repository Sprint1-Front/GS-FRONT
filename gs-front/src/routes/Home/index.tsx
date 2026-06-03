import { useEffect, useState } from "react"
import Surface from "../../components/Ocean/Surface"
import Midwater from "../../components/Ocean/Midwater"
import AbyssZone from "../../components/Ocean/AbyssZone"
import Floor from "../../components/Ocean/Floor"
import DepthIndicator from "../../components/Ocean/DepthIndicator"
import Fish from "../../components/Ocean/Fish"

const zones = [
  { name: "Superfície",       desc: "Zona fótica · 0–200m",          bg: "#4ab8e8", start: 0    },
  { name: "Zona Crepuscular", desc: "Meso-pelágica · 200–1000m",      bg: "#1a6a9a", start: 0.2  },
  { name: "Zona Meia-Noite",  desc: "Bati-pelágica · 1000–4000m",     bg: "#0d3a58", start: 0.4  },
  { name: "Abissal",          desc: "Zona abisal · 4000–6000m",       bg: "#071828", start: 0.65 },
  { name: "Hadal",            desc: "Fossa das Marianas · 6000–11km", bg: "#030810", start: 0.85 },
]

function lerpColor(c1: string, c2: string, t: number) {
  const hex = (h: string) => [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ]
  const [r1, g1, b1] = hex(c1)
  const [r2, g2, b2] = hex(c2)
  const l = (a: number, b: number) => Math.round(a + (b - a) * t)
  return `rgb(${l(r1, r2)},${l(g1, g2)},${l(b1, b2)})`
}

export default function Home() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      setProgress(Math.min(window.scrollY / max, 1))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const zi = zones.reduce((acc, z, i) => (progress >= z.start ? i : acc), 0)
  const cur = zones[zi]
  const next = zones[Math.min(zi + 1, zones.length - 1)]
  const span = (next.start - cur.start) || 1
  const t = Math.min((progress - cur.start) / span, 1)
  const bgColor = lerpColor(cur.bg, next.bg, t)

  return (
    <div style={{ height: "500vh" }}>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: bgColor, transition: "background 0.1s" }}
      >
        <Surface progress={progress} />
        <Midwater progress={progress} />
        <AbyssZone progress={progress} />
        <Floor progress={progress} />
        <Fish progress={progress} />
        
        {/* indicador de profundidade */}
        <DepthIndicator progress={progress} zone={cur} />

        {/* nome da zona */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none">
          <h2
            className="text-5xl font-light italic text-white/90"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {cur.name}
          </h2>
          <p className="text-white/50 text-sm font-light mt-2 tracking-wide">
            {cur.desc}
          </p>
        </div>

        {/* scroll hint */}
        {progress < 0.03 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/40 text-xs tracking-widest uppercase">mergulhe</span>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <path d="M8 2 L8 16 M3 11 L8 17 L13 11" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}