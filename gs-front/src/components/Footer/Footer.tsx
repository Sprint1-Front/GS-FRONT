import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-overlay-0/20 py-10 mt-auto transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Coluna 1: Logo e Descrição */}
        <div className="flex flex-col gap-3">
          <Link to="/" className="flex items-center gap-2 no-underline text-text w-fit">
            <span style={{ fontSize: 24 }}>🌊</span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 600,
                fontStyle: "italic",
                letterSpacing: ".04em",
              }}
            >
              Thalassor
            </span>
          </Link>
          <p className="text-subtext-0 font-body text-sm leading-relaxed max-w-xs">
            Monitoramento das profundezas e preservação dos oceanos. Uma solução desenvolvida para a Global Solution 2026.
          </p>
        </div>

        {/* Coluna 2: Navegação */}
        <div className="flex flex-col gap-3 md:items-center">
          <h3 className="text-text font-display font-semibold text-lg">Navegação</h3>
          <nav className="flex flex-col gap-2">
            <Link to="/sobre" className="text-subtext-0 hover:text-teal font-body text-sm transition-colors">Sobre Nós</Link>
            <Link to="/faq" className="text-subtext-0 hover:text-teal font-body text-sm transition-colors">Perguntas Frequentes</Link>
            <Link to="/integrantes" className="text-subtext-0 hover:text-teal font-body text-sm transition-colors">Tripulação (Time)</Link>
            <Link to="/cadastro" className="text-subtext-0 hover:text-teal font-body text-sm transition-colors">Alistar-se</Link>
          </nav>
        </div>

        {/* Coluna 3: Contato / Redes */}
        <div className="flex flex-col gap-3 md:items-end">
          <h3 className="text-text font-display font-semibold text-lg">Conexão</h3>
          <div className="flex flex-col gap-2 md:items-end">
            <a href="#" className="text-subtext-0 hover:text-teal font-body text-sm transition-colors flex items-center gap-2">
              GitHub <span className="text-xs">↗</span>
            </a>
            <a href="#" className="text-subtext-0 hover:text-teal font-body text-sm transition-colors flex items-center gap-2">
              LinkedIn <span className="text-xs">↗</span>
            </a>
            <p className="text-subtext-1 font-body text-xs mt-2">
              contato@thalassor.com
            </p>
          </div>
        </div>

      </div>

      {/* Direitos Autorais */}
      <div className="max-w-6xl mx-auto px-6 mt-10 pt-4 border-t border-overlay-0/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-subtext-1 font-body text-xs tracking-wider uppercase">
          © 2026 Thalassor. Todos os direitos reservados.
        </p>
        <p className="text-subtext-1 font-body text-xs">
          Global Solution - Design Engineering
        </p>
      </div>
    </footer>
  );
}