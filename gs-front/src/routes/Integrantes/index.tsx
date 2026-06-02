import { useEffect, useState } from "react"
import Surface from "../../components/Ocean/Surface"
import Midwater from "../../components/Ocean/Midwater"
import AbyssZone from "../../components/Ocean/AbyssZone"
import Floor from "../../components/Ocean/Floor"

const urlGithub = "https://github.com/"

const integrantes = [
  { name: "Andre", role: "Frontend Developer", github: `{urlGithub}` },
  { name: "Kaliel", role: "Backend Developer", github: "kaliel" },
  { name: "Paulo", role: "UI/UX Designer", github: "paulo" },
  { name: "Guilherme", role: "Project Manager", github: "guilherme" },
  { name: "Ilda", role: "QA Engineer", github: "ilda" },]

export default function Integrantes() {
  return (
    <div>Integrantes</div>
  )
}
