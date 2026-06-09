import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/sobre", label: "Sobre Nós" },
  { to: "/faq", label: "FAQ" },
  { to: "/integrantes", label: "Time" },
];

export default function Header() {
  const location = useLocation();

  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved =
      localStorage.theme === "dark" ||
      (!localStorage.theme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      root.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // na página Home o header começa totalmente transparente
  const isHome = location.pathname === "/" || location.pathname === "/home";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-md' : ''}`}
      style={{
        background: scrolled
          ? "color-mix(in srgb, var(--color-mantle) 85%, transparent)"
          : isHome
            ? "transparent"
            : "color-mix(in srgb, var(--color-mantle) 60%, transparent)",
        borderBottom: scrolled
          ? "1px solid color-mix(in srgb, var(--color-overlay-0) 40%, transparent)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* logo */}
        <Link
          to="/"
          className="flex items-center gap-2 no-underline text-text"
        >
          <span className="text-[22px]">🌊</span>
          <span
            className="font-display text-[20px] font-normal italic tracking-wider text-text"
          >
            Thalassor
          </span>
        </Link>

        {/* links — desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`font-body text-[13px] font-normal tracking-wider uppercase no-underline pb-[2px] border-b border-transparent transition-colors duration-200 hover:text-text/90 ${active ? 'text-teal border-teal' : 'text-text/55'}`}
                style={active ? { color: 'var(--color-teal)', borderBottomColor: 'var(--color-teal)' } : {}}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* direita */}
        <div className="flex items-center gap-3">
          {/* toggle tema */}
          <button
            onClick={() => setDark(!dark)}
            title={dark ? "Modo claro" : "Modo escuro"}
            className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer text-[15px] transition-all duration-200"
            style={{
              background: "color-mix(in srgb, var(--color-overlay-0) 30%, transparent)",
              border: "1px solid color-mix(in srgb, var(--color-overlay-0) 60%, transparent)",
            }}
          >
            {dark ? "☼" : "☾"}
          </button>

          {/* login — desktop */}
          <Link
            to="/login"
            className="hidden md:block font-mono text-[11px] tracking-widest uppercase py-[7px] px-4 rounded-sm no-underline font-medium transition-colors duration-200"
            style={{
              color: "var(--color-crust)",
              background: "var(--color-teal)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-foam)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-teal)")}
          >
            Embarcar
          </Link>

          {/* hamburguer — mobile */}
          <button
            className="md:hidden bg-transparent border-none cursor-pointer text-[22px] leading-none text-text"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* menu mobile */}
      <div
        style={{
          maxHeight: menuOpen ? 400 : 0,
          overflow: "hidden",
          transition: "max-height .35s ease",
          background: "color-mix(in srgb, var(--color-crust) 97%, transparent)",
          borderTop: menuOpen ? "1px solid color-mix(in srgb, var(--color-overlay-0) 40%, transparent)" : "none",
        }}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="font-body text-[14px] tracking-wider uppercase no-underline transition-colors duration-200"
              style={{
                color: location.pathname === l.to ? "var(--color-teal)" : "color-mix(in srgb, var(--color-text) 60%, transparent)"
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="inline-block mt-1 w-fit font-mono text-[11px] tracking-widest uppercase py-2 px-4 rounded-sm no-underline font-medium"
            style={{
              color: "var(--color-crust)",
              background: "var(--color-teal)",
            }}
          >
            Embarcar
          </Link>
        </nav>
      </div>
    </header>
  );
}
