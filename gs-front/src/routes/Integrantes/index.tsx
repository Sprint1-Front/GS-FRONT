import { useEffect, useState } from "react"
import Surface from "../../components/Ocean/Surface"
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

const integrantes = [
  { name: "Andre Sousa Matuda", role: "Frontend Developer", github: "Andre-Matuda" },
  { name: "Kaliel", role: "Backend Developer", github: "if-kaliel" },
  { name: "Paulo", role: "UI/UX Designer", github: "paulo" },
  { name: "Guilherme", role: "Project Manager", github: "guilherme" },
  { name: "Ilda", role: "QA Engineer", github: "ilda" },]

export default function Integrantes() {
  const [progress, setProgress] = useState(0)
  const [bgColor, setBgColor] = useState(zones[0].bg)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = window.scrollY / totalHeight
      setProgress(currentProgress)

      let currentZone = zones[0]
      for (let i = 0; i < zones.length; i++) {
        if (currentProgress >= zones[i].start) {
          currentZone = zones[i]
        }
      }
      setBgColor(currentZone.bg)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const zi = zones.reduce((acc, z, i) => (progress >= z.start ? i : acc), 0)
  const cur = zones[zi]

  return (
    <div className="min-h-[500vh] flex flex-col items-center pt-20">
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: bgColor, transition: "background 0.1s" }}>
        <Surface progress={progress} />
        <Midwater progress={progress} />
        <AbyssZone progress={progress} />
        <Floor progress={progress} />

        <DepthIndicator progress={progress} zone={cur} />
      </div>

      <h1 className="text-4xl font-bold mb-20 text-white sticky top-10">Integrantes do Projeto</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {integrantes.map((member) => (
          <div key={member.name} className="bg-white/10 backdrop-blur-md rounded-lg shadow-md p-6 text-center text-white border border-white/20">
            <h2 className="text-2xl font-semibold mb-2">{member.name}</h2>
            <p className="text-gray-200 mb-4">{member.role}</p>
            <a href={`https://github.com/${member.github}`} className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">
              GitHub: {member.github}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
