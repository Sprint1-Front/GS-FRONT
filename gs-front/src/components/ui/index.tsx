import { useState, useEffect } from "react"

export function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false
    return (
      localStorage.theme === "dark" ||
      (!localStorage.theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    )
  })

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
    <button
      onClick={() => setDark(!dark)}
      className="bg-surface-1 text-text border border-crust px-4 py-2 rounded-lg hover:bg-surface-2 transition-colors"
    >
      {dark ? "☀️ Modo claro" : "🌙 Modo escuro"}
    </button>
  )
}