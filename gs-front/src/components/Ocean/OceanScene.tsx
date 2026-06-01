import { useEffect, useState } from "react"
import Surface from "./Surface"
import Shallow from "./Shallow"
import Midwater from "./Midwater"
import Abyss from "./AbyssZone"
import Floor from "./Floor"

export default function OceanScene() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // converte scrollY em % de 0 a 100
  const progress = Math.min(scrollY / (document.body.scrollHeight - window.innerHeight) * 100, 100)

  // cor de fundo muda conforme profundidade
  const bgColor = `hsl(${200 - progress * 1.8}, ${70 - progress * 0.4}%, ${60 - progress * 0.55}%)`

  return (
    <div style={{ background: bgColor }} className="transition-colors duration-300">
      <Surface progress={progress} />
      <Shallow progress={progress} />
      <Midwater progress={progress} />
      <Abyss progress={progress} />
      <Floor progress={progress} />
    </div>
  )
}