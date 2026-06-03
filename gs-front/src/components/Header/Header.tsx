import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Header() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved =
      localStorage.theme === "dark" ||
      (!localStorage.theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    setDark(saved)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add("dark")
      localStorage.theme = "dark"
    } else {
      root.classList.remove("dark")
      localStorage.theme = "light"
    }
  }, [dark])

  return (
    <header className="bg-mantle text-text border-b border-crust p-4 flex justify-between items-center">
      <h1>THALASSOR</h1>
      <nav className="flex items-center gap-3">
        <Link to="/home" className="text-subtext-1 hover:text-text transition-colors">Sobre Nós</Link>
        <Link to="/sobre" className="text-subtext-1 hover:text-text transition-colors">Sobre</Link>
        <Link to="/contato" className="text-subtext-1 hover:text-text transition-colors">Contato</Link>
        <Link to="/blog" className="text-subtext-1 hover:text-text transition-colors">Blog</Link>
        <Link to="/login" className="text-subtext-1 hover:text-text transition-colors">Login</Link>
        <Link to="/register" className="text-subtext-1 hover:text-text transition-colors">Registrar</Link>
        <Link to="/profile" className="text-subtext-1 hover:text-text transition-colors">Perfil</Link>

        <button
          onClick={() => setDark(!dark)}
          className="ml-2 px-3 py-1 bg-surface-1 text-text border border-crust rounded-lg hover:bg-surface-2 transition-colors"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </nav>
    </header>
  )
}