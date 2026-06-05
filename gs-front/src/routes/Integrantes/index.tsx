import { useEffect, useState } from "react"
import Surface from "../../components/Ocean/Surface"
import Midwater from "../../components/Ocean/Midwater"
import AbyssZone from "../../components/Ocean/AbyssZone"
import Floor from "../../components/Ocean/Floor"
import DepthIndicator from "../../components/Ocean/DepthIndicator"

import githubIcon from "../../assets/icons/github.svg"
import linkedinIcon from "../../assets/icons/linkedin.svg"

const zones = [
  { name: "Superfície",       desc: "Zona fótica · 0–200m",          bg: "#4ab8e8", start: 0    },
  { name: "Zona Crepuscular", desc: "Meso-pelágica · 200–1000m",      bg: "#1a6a9a", start: 0.2  },
  { name: "Zona Meia-Noite",  desc: "Bati-pelágica · 1000–4000m",     bg: "#0d3a58", start: 0.4  },
  { name: "Abissal",          desc: "Zona abisal · 4000–6000m",       bg: "#071828", start: 0.65 },
  { name: "Hadal",            desc: "Fossa das Marianas · 6000–11km", bg: "#030810", start: 0.85 },
]

const integrantes = [
  { name: "Andre Sousa Matuda", role: "Frontend Developer", github: "Andre-Matuda", rm: "RM566733", linkedin: "#", depth: "8%", align: "justify-center", title: "Mergulhador de Superfície", delay: "0s" },
  { name: "Kaliel", role: "Backend Developer", github: "if-kaliel", rm: "RM567587", linkedin: "kaliel-aquino-a034332b6", depth: "28%", align: "justify-start md:pl-[15%]", title: "Explorador Crepuscular", delay: "1s" },
  { name: "Paulo", role: "UI/UX Designer", github: "paulodiedrich", rm: "RM567618", linkedin: "#", depth: "50%", align: "justify-end md:pr-[15%]", title: "Navegador da Meia-Noite", delay: "2s" },
  { name: "Guilherme", role: "Project Manager", github: "GuilherOliverFeitosa", rm: "RM566842", linkedin: "#", depth: "72%", align: "justify-start md:pl-[10%]", title: "Guardião Abissal", delay: "0.5s" },
  { name: "Ilda", role: "QA Engineer", github: "ilda", rm: "RM568233", linkedin: "#", depth: "90%", align: "justify-center", title: "Desbravadora Hadal", delay: "1.5s" },
]

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
    <div className="h-[500vh] relative w-full">
      <style>{`
        @keyframes float-diver {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(2deg); }
        }
        .animate-diver {
          animation: float-diver 6s ease-in-out infinite;
        }
      `}</style>

      {/* Fundo do Oceano */}
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: bgColor, transition: "background 0.5s ease" }}>
        <Surface progress={progress} />
        <Midwater progress={progress} />
        <AbyssZone progress={progress} />
        <Floor progress={progress} />

        <DepthIndicator progress={progress} zone={cur} />
      </div>

      {/* Título no topo, indicando o início da expedição */}
      <div className="absolute top-0 w-full flex flex-col items-center pt-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Expedição Global Solution
        </h1>
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl font-medium drop-shadow-md">
          Coloque seu escafandro e mergulhe para conhecer a equipe responsável por esta exploração.
        </p>
        <div className="mt-8 animate-bounce text-white bg-white/10 p-3 rounded-full backdrop-blur-sm border border-white/20">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Mergulhadores espalhados pelas profundezas */}
      {integrantes.map((member) => (
        <div 
          key={member.name} 
          className={`absolute w-full flex px-6 md:px-12 ${member.align}`}
          style={{ top: member.depth }}
        >
          <div 
            className="animate-diver bg-[#0a192f]/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 text-center text-white border-2 border-blue-500/30 flex flex-col items-center w-[280px] md:w-[320px]"
            style={{ animationDelay: member.delay }}
          >
            {/* Design de Escafandro / Janela de Submarino */}
            <div className="relative w-36 h-36 rounded-full border-[10px] border-[#596275] bg-[#2f3542] shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center mb-5 overflow-hidden group">
              {/* Parafusos da janela */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-400"></div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-400"></div>
              <div className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400"></div>
              <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400"></div>
              
              <img 
                src={`https://github.com/${member.github}.png`} 
                alt={`Mergulhador ${member.name}`}
                className="w-full h-full object-cover p-1 rounded-full transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Reflexo do vidro */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/40 rounded-full pointer-events-none" />
            </div>

            <span className="bg-blue-900/80 text-blue-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 shadow-inner border border-blue-700/50">
              {member.title}
            </span>
            
            <h2 className="text-xl font-bold mb-1 text-blue-50">{member.name}</h2>
            <p className="text-blue-300 text-sm font-medium mb-2">{member.role}</p>
            <div className="bg-black/40 px-3 py-1 rounded-md text-gray-300 text-xs mb-6 font-mono border border-white/5 shadow-inner">
              {member.rm}
            </div>
            
            <div className="flex gap-5 mt-auto">
              <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer" className="hover:-translate-y-1 transition-transform bg-[#1e272e] p-3 rounded-full border border-gray-600 hover:border-blue-400 hover:shadow-[0_0_10px_rgba(96,165,250,0.5)]">
                <img src={githubIcon} alt="GitHub" className="w-5 h-5 invert" />
              </a>
              <a href={`https://www.linkedin.com/in/${member.linkedin}/`} target="_blank" rel="noopener noreferrer" className="hover:-translate-y-1 transition-transform bg-[#1e272e] p-3 rounded-full border border-gray-600 hover:border-blue-400 hover:shadow-[0_0_10px_rgba(96,165,250,0.5)]">
                <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5 invert" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
