import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-primary text-text p-4 flex justify-between items-center font">
      <h1>THALASSOR</h1>
      <nav>
        <Link to="/home">Sobre Nós</Link> | <Link to="/sobre">Sobre</Link> |{" "}
        <Link to="/contact">Contato</Link> | <Link to="/blog">Blog</Link> |{" "}
        <Link to="/login">Login</Link> |{" "} | <Link to="/register">Registrar</Link>{" "}
        <Link to="/profile">Perfil</Link>

        <button className="ml-4 px-3 py-1 bg-secondary text-white rounded">
          ☼
        </button>
      </nav>
    </header>
  )
}
