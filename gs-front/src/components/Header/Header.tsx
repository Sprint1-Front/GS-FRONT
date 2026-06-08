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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(10, 24, 32, 0.85)"
          : isHome
            ? "transparent"
            : "rgba(10, 24, 32, 0.6)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(46, 80, 96, 0.4)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* logo */}
        <Link
          to="/"
          className="flex items-center gap-2 no-underline"
          style={{ textDecoration: "none" }}
        >
          <span style={{ fontSize: 22 }}>🌊</span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20,
              fontWeight: 400,
              fontStyle: "italic",
              color: "#c8e8f4",
              letterSpacing: ".04em",
            }}
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
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 13,
                  fontWeight: 400,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: active ? "#4ec4d4" : "rgba(200, 232, 244, 0.55)",
                  borderBottom: active
                    ? "1px solid #4ec4d4"
                    : "1px solid transparent",
                  paddingBottom: 2,
                  transition: "color .2s, border-color .2s",
                }}
                onMouseEnter={(e) => {
                  if (!active)
                    (e.target as HTMLElement).style.color =
                      "rgba(200,232,244,0.9)";
                }}
                onMouseLeave={(e) => {
                  if (!active)
                    (e.target as HTMLElement).style.color =
                      "rgba(200,232,244,0.55)";
                }}
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
            style={{
              background: "rgba(46, 80, 96, 0.3)",
              border: "1px solid rgba(46, 80, 96, 0.6)",
              borderRadius: 20,
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 15,
              transition: "all .2s",
            }}
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* login — desktop */}
          <Link
            to="/login"
            className="hidden md:block"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#071318",
              background: "#4ec4d4",
              padding: "7px 16px",
              borderRadius: 2,
              textDecoration: "none",
              fontWeight: 500,
              transition: "background .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#7ed8e8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#4ec4d4")}
          >
            Embarcar
          </Link>

          {/* hamburguer — mobile */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#c8e8f4",
              fontSize: 22,
              lineHeight: 1,
            }}
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
          background: "rgba(7, 19, 24, 0.97)",
          borderTop: menuOpen ? "1px solid rgba(46,80,96,0.4)" : "none",
        }}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 14,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                textDecoration: "none",
                color:
                  location.pathname === l.to
                    ? "#4ec4d4"
                    : "rgba(200,232,244,0.6)",
                transition: "color .2s",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#071318",
              background: "#4ec4d4",
              padding: "8px 16px",
              borderRadius: 2,
              textDecoration: "none",
              fontWeight: 500,
              display: "inline-block",
              marginTop: 4,
              width: "fit-content",
            }}
          >
            Embarcar
          </Link>
        </nav>
      </div>
    </header>
  );
}
