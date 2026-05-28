import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <h1>TEMP</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/">temp</Link> |{" "}
        <Link to="/">temp</Link>
      </nav>
    </header>
  )
}
