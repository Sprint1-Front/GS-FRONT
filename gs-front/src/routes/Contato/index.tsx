import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    setOk(null);

    try {
      // Placeholder: sem backend específico para contato nesse front.
      // Mantém a UX: valida e simula envio.
      if (!nome.trim()) throw new Error("Informe seu nome.");
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Informe um e-mail válido.");
      }
      if (!mensagem.trim()) throw new Error("Escreva sua mensagem.");

      await new Promise((r) => setTimeout(r, 700));
      setOk("Mensagem enviada! Em breve retornaremos.");
      setNome("");
      setEmail("");
      setMensagem("");
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base text-text flex items-center justify-center p-4 md:py-12 overflow-y-auto">
      <div className="bg-mantle backdrop-blur-xl border border-crust rounded-xl p-8 w-full max-w-3xl shadow-lg">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2
            className="text-3xl font-bold text-teal text-center flex-1"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Fale Conosco
          </h2>
          <Link
            to="/"
            className="text-sm text-subtext-0 hover:text-text transition-colors"
          >
            Voltar
          </Link>
        </div>

        {erro && (
          <div className="bg-red-500/20 text-red-500 p-3 rounded mb-4">{erro}</div>
        )}
        {ok && (
          <div className="bg-teal-500/20 text-teal-200 p-3 rounded mb-4">
            {ok}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="nome" className="text-sm font-semibold">
                Nome
              </label>
              <input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="p-2 rounded bg-crust border border-surface0 focus:border-teal outline-none transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-semibold">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded bg-crust border border-surface0 focus:border-teal outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="mensagem" className="text-sm font-semibold">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              rows={6}
              className="p-2 rounded bg-crust border border-surface0 focus:border-teal outline-none transition-colors resize-none"
              required
            />
          </div>

          <div className="flex gap-4 mt-2 justify-end border-t border-surface0 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-teal-500 hover:bg-teal-400 text-white rounded font-semibold transition-all disabled:opacity-50 shadow-md hover:shadow-teal-500/50"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

