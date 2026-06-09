import { useEffect, useState } from "react";
import Surface from "../../components/Ocean/Surface";
import Midwater from "../../components/Ocean/Midwater";
import AbyssZone from "../../components/Ocean/AbyssZone";
import Floor from "../../components/Ocean/Floor";
import DepthIndicator from "../../components/Ocean/DepthIndicator";
import Fish from "../../components/Ocean/Fish";

const zones = [
  { name: "Superfície",    desc: "Zona fótica · 0–200m",          bg: "#4ab8e8", start: 0    },
  { name: "Zona Crepuscular", desc: "Meso-pelágica · 200–1000m",   bg: "#1a6a9a", start: 0.2  },
  { name: "Zona Meia-Noite",  desc: "Bati-pelágica · 1000–4000m",  bg: "#0d3a58", start: 0.4  },
  { name: "Abissal",          desc: "Zona abisal · 4000–6000m",    bg: "#071828", start: 0.65 },
  { name: "Hadal",            desc: "Fossa das Marianas · 6000–11km", bg: "#030810", start: 0.85 },
];

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

// Organizando as perguntas por profundidade/zona para dar sentido ao scroll
const faqQuestions = [
  {
    zoneIndex: 0, // Superfície
    title: "O que é o projeto?",
    answer: "Este projeto é uma plataforma interativa que simula a profundidade dos oceanos, ajudando a verificar lixos maritimos."
  },
  {
    zoneIndex: 1, // Crepuscular
    title: "Como posso contribuir com a preservação?",
    answer: "Você pode apoiar ONGs de conservação marinha, reduzir o uso de plásticos descartáveis e compartilhar o conhecimento técnico e científico deste projeto."
  },
  {
    zoneIndex: 2, // Meia-Noite
    title: "De onde vêm os dados de profundidade?",
    answer: "Os dados e divisões de zonas pelágicas foram baseados em estudos oceanográficos reais, mapeando desde a zona fótica até as fossas mais profundas."
  },
  {
    zoneIndex: 3, // Abissal
    title: "Quais tecnologias foram utilizadas?",
    answer: "O ecossistema foi construído utilizando React, Tailwind CSS para a estilização estrutural, e manipulação matemática de estados para criar transições puras de cores durante o scroll."
  },
  {
    zoneIndex: 4, // Hadal
    title: "Existe um limite para o mergulho?",
    answer: "Na aplicação, o limite é a Fossa das Marianas (11km). Na vida real, a pressão nesta zona passa de 1000 atmosferas, tornando a exploração um dos maiores desafios da humanidade."
  }
];

export default function Faq() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Garante que o progresso fique estritamente entre 0 e 1
      setProgress(Math.max(0, Math.min(window.scrollY / totalHeight, 1)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lógica do Lerp de cores idêntica à Home
  const zi = zones.reduce((acc, z, i) => (progress >= z.start ? i : acc), 0);
  const cur = zones[zi];
  const next = zones[Math.min(zi + 1, zones.length - 1)];
  const span = (next.start - cur.start) || 1;
  const t = Math.min((progress - cur.start) / span, 1);
  const bgColor = lerpColor(cur.bg, next.bg, t);

  return (
    // Altura reduzida (h-[250vh]) para exigir menos scrolladas e alinhar com as zonas
    <div className="relative min-h-[250vh] text-white">
      
      {/* BACKGROUND FIXO COM AS ANIMAÇÕES */}
      <div
        className="fixed inset-0 -z-10 overflow-hidden"
        style={{ background: bgColor, transition: "background 0.1s" }}
      >
        <Surface progress={progress} />
        <Midwater progress={progress} />
        <AbyssZone progress={progress} />
        <Floor progress={progress} />
        <Fish progress={progress} />

        <DepthIndicator progress={progress} zone={cur} />
      </div>

      {/* CONTEÚDO SCROLLÁVEL */}
      <div className="w-full max-w-3xl mx-auto px-6 pt-32 pb-60 flex flex-col items-center">
        
        {/* Título Fixo no Topo do Scroll Inicial */}
        <div className="text-center mb-24">
          <h1 className="text-5xl font-light tracking-wide uppercase text-white/90">Perguntas Frequentes</h1>
          <p className="text-white/60 mt-3 italic font-light">Role para baixo para explorar as respostas nas profundezas</p>
        </div>

        {/* Lista de Cards Espaçados */}
        <div className="w-full space-y-[20vh]"> 
          {faqQuestions.map((item, index) => {
            const isCurrentZone = zi === item.zoneIndex;

            return (
              <div
                key={index}
                className={`p-8 rounded-2xl border transition-all duration-650 ${
                  isCurrentZone 
                    ? "bg-surface-0 border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] scale-100 opacity-100" 
                    : "bg-black/10 border-white/5 scale-95 opacity-40 blur-[1px]"
                }`}
                style={{ backdropFilter: "blur(12px)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs uppercase tracking-widest px-2.5 py-1 rounded-full bg-surface-0 text-white/70">
                    {zones[item.zoneIndex].name}
                  </span>
                </div>
                
                <h2 className="text-2xl font-medium text-white/90 mb-3">
                  {item.title}
                </h2>
                <p className="text-white/70 leading-relaxed font-light">
                  {item.answer}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}