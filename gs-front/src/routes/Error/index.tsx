import { Link } from "react-router-dom";

export default function Error() {
  return (
    <main>
        <h1>Erro 404 - Não encontrado</h1>
        <div>
            <p>Voltar para o início - <Link to="/">INÍCIO</Link></p>
        </div>
    </main>
  )
}