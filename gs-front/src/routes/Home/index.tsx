import { useEffect, useState } from "react"
import Surface from "../../components/Ocean/Surface"
import Shallow from "../../components/Ocean/Shallow"
import Midwater from "../../components/Ocean/Midwater"
import AbyssZone from "../../components/Ocean/AbyssZone"
import Floor from "../../components/Ocean/Floor"
import DepthIndicator from "../../components/Ocean/DepthIndicator"

const zones = [
  { name: "Superfície",       desc: "Zona fótica · 0–200m",          bg: "#4ab8e8", start: 0    },
  { name: "Zona Crepuscular", desc: "Meso-pelágica · 200–1000m",      bg: "#1a6a9a", start: 0.2  },
  { name: "Zona Meia-Noite",  desc: "Bati-pelágica · 1000–4000m",     bg: "#0d3a58", start: 0.4  },
  { name: "Abissal",          desc: "Zona abisal · 4000–6000m",       bg: "#071828", start: 0.65 },
  { name: "Hadal",            desc: "Fossa das Marianas · 6000–11km", bg: "#030810", start: 0.85 },
]

function lerpColor(c1: string, c2: string, t: number) {
  const hex = (h: string) => [
    parseInt(h.slice(1,3),16),
    parseInt(h.slice(3,5),16),
    parseInt(h.slice(5,7),16),
  ]
  const [r1,g1,b1] = hex(c1)
  const [r2,g2,b2] = hex(c2)
  const l = (a: number, b: number) => Math.round(a + (b - a) * t)
  return `rgb(${l(r1,r2)},${l(g1,g2)},${l(b1,b2)})`
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

  const zi = zones.findLastIndex(z => progress >= z.start)
  const cur = zones[zi]
  const next = zones[Math.min(zi + 1, zones.length - 1)]
  const span = (next.start - cur.start) || 1
  const t = Math.min((progress - cur.start) / span, 1)
  const bgColor = lerpColor(cur.bg, next.bg, t)

  return (
    <div style={{ height: "500vh" }}>
      <div
        className="sticky top-0 h-screen overflow-hidden transition-colors duration-100"
        style={{ background: bgColor }}
      >
        <Surface progress={progress} />
        <Shallow progress={progress} />
        <Midwater progress={progress} />
        <AbyssZone progress={progress} />
        <Floor progress={progress} />
        <DepthIndicator progress={progress} zone={cur} />

        <div className="absolute left-8 top-1/2 -translate-y-1/2">
          <h2
            className="font-display text-5xl font-light italic text-white/90"
            style={{ opacity: Math.min(1, Math.abs(progress - cur.start - 0.1) < 0.15 ? 1 : 0.7 ) }}
          >
            {cur.name}
          </h2>
          <p className="text-white/50 text-sm font-light mt-2 tracking-wide">
            {cur.desc}
          </p>
        </div>
      </div>
    </div>
  )
}