import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Surface from "../../components/Ocean/Surface";
import Midwater from "../../components/Ocean/Midwater";
import AbyssZone from "../../components/Ocean/AbyssZone";
import Floor from "../../components/Ocean/Floor";
import DepthIndicator from "../../components/Ocean/DepthIndicator";
import Fish from "../../components/Ocean/Fish";

const zones = [
  { name: "Superfície", desc: "Zona fótica · 0–200m", bg: "#4ab8e8", start: 0 },
  {
    name: "Zona Crepuscular",
    desc: "Meso-pelágica · 200–1000m",
    bg: "#1a6a9a",
    start: 0.2,
  },
  {
    name: "Zona Meia-Noite",
    desc: "Bati-pelágica · 1000–4000m",
    bg: "#0d3a58",
    start: 0.4,
  },
  {
    name: "Abissal",
    desc: "Zona abissal · 4000–6000m",
    bg: "#071828",
    start: 0.65,
  },
  {
    name: "Hadal",
    desc: "Fossa das Marianas · 6000–11km",
    bg: "#030810",
    start: 0.85,
  },
];

function lerpColor(c1: string, c2: string, t: number) {
  const hex = (h: string) => [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
  const [r1, g1, b1] = hex(c1);
  const [r2, g2, b2] = hex(c2);
  const l = (a: number, b: number) => Math.round(a + (b - a) * t);
  return `rgb(${l(r1, r2)},${l(g1, g2)},${l(b1, b2)})`;
}

export default function Home() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(Math.min(window.scrollY / max, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const zi = zones.reduce((acc, z, i) => (progress >= z.start ? i : acc), 0);
  const cur = zones[zi];
  const next = zones[Math.min(zi + 1, zones.length - 1)];
  const span = next.start - cur.start || 1;
  const t = Math.min((progress - cur.start) / span, 1);
  const bgColor = lerpColor(cur.bg, next.bg, t);

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

        {/* nome da zona (canto esquerdo) */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block z-10">
          <h2
            className="text-5xl font-light italic text-white/90 drop-shadow-md"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {cur.name}
          </h2>
          <p className="text-white/60 text-sm font-light mt-2 tracking-wide drop-shadow-sm">
            {cur.desc}
          </p>
        </div>

        {/* CONTEÚDO PRINCIPAL (Interativo conforme o scroll) */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center px-4 z-20">
          {/* ZONA 0: SUPERFÍCIE (Hero Section) */}
          <div
            className={`transition-all duration-700 absolute flex flex-col items-center text-center transform ${progress < 0.15 ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-8 pointer-events-none"}`}
          >
            <h1
              className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              OceanGuard
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl drop-shadow-md font-light">
              Monitoramento inteligente e preservação contínua das nossas águas
              oceânicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                to="/cadastro"
                className="px-8 py-3 bg-blue-500/90 hover:bg-blue-400 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-blue-500/50 backdrop-blur-sm"
              >
                Começar Agora
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold transition-all"
              >
                Fazer Login
              </Link>
            </div>
          </div>

          {/* ZONA 1: CREPUSCULAR (Dashboard) */}
          <div
            className={`transition-all duration-700 absolute flex flex-col items-center text-center transform ${progress >= 0.15 && progress < 0.35 ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none"}`}
          >
            <h2
              className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Dados em Tempo Real
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-xl drop-shadow-md font-light">
              Acompanhe métricas vitais de temperatura, pH e poluição
              diretamente do nosso painel de controle interativo.
            </p>
            <Link
              to="/dashboard"
              className="px-8 py-3 bg-teal-500/90 hover:bg-teal-400 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-teal-500/50 backdrop-blur-sm"
            >
              Acessar Dashboard
            </Link>
          </div>

          {/* ZONA 2: MEIA-NOITE (FAQ) */}
          <div
            className={`transition-all duration-700 absolute flex flex-col items-center text-center transform ${progress >= 0.35 && progress < 0.65 ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none"}`}
          >
            <h2
              className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Como Funciona?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-xl drop-shadow-md font-light">
              Entenda a tecnologia por trás dos nossos sensores subaquáticos e o
              impacto gerado na vida marinha.
            </p>
            <Link
              to="/faq"
              className="px-8 py-3 bg-indigo-500/90 hover:bg-indigo-400 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-indigo-500/50 backdrop-blur-sm"
            >
              Dúvidas Frequentes (FAQ)
            </Link>
          </div>

          {/* ZONA 3 E 4: ABISSAL / HADAL (Sobre e Integrantes) */}
          <div
            className={`transition-all duration-700 absolute flex flex-col items-center text-center transform ${progress >= 0.65 ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none"}`}
          >
            <h2
              className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Quem Somos
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-xl drop-shadow-md font-light">
              Conheça a equipe dedicada a explorar e proteger as profundezas até
              então desconhecidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                to="/sobre"
                className="px-8 py-3 bg-slate-700/80 hover:bg-slate-600 border border-slate-500 text-white rounded-full font-semibold transition-all backdrop-blur-sm"
              >
                Sobre o Projeto
              </Link>
              <Link
                to="/integrantes"
                className="px-8 py-3 bg-transparent hover:bg-white/10 border border-white/30 text-white rounded-full font-semibold transition-all backdrop-blur-sm"
              >
                Ver Integrantes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
