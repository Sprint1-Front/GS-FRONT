import { useState } from "react";

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    // Simulação do tempo de envio da mensagem para a base
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus("success");
      setFormData({ nome: "", email: "", mensagem: "" }); // Limpa o formulário
    }, 1500);
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-base text-text py-24 px-4 pt-32">
      {/* Background Decorativo Oceânico */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sapphire opacity-10 blur-[150px] rounded-full mix-blend-screen pointer-events-none transition-transform duration-1000"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-sapphire opacity-40 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      <div className="relative w-full max-w-2xl p-8 md:p-12 bg-white/5 backdrop-blur-xl border border-mantle rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-10 mx-auto">
        
        {/* Cabeçalho */}
        <div className="flex flex-col items-center gap-2 mb-10 text-center">
          <div className="w-16 h-16 mb-2 flex items-center justify-center rounded-full bg-white/5 border border-mantle shadow-[0_0_30px_rgba(74,184,232,0.15)]">
            <span className="text-3xl drop-shadow-[0_0_15px_rgba(74,184,232,0.6)]">📬</span>
          </div>
          <h1 className="text-3xl font-light text-text tracking-widest uppercase">
            Sinal de Rádio
          </h1>
          <p className="text-subtext-0 text-xs font-mono uppercase tracking-[0.2em] opacity-80 mt-1">
            Comunicação com a Base
          </p>
          <p className="mt-4 text-subtext-1 text-centersm max-w-md font-light leading-relaxed">
            Tem dúvidas sobre a missão Thalassor? Deseja reportar uma anomalia nos radares? Envie sua mensagem e nossa tripulação retornará o contato em breve.
          </p>
        </div>

        {/* Feedback de Sucesso */}
        {status === "success" && (
          <div className="mb-8 p-4 bg-crust border border-mantle rounded-xl text-subtext-0 text-sm text-center font-light backdrop-blur-sm animate-pulse">
            Sinal transmitido com sucesso! A base de operações confirmou o recebimento.
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label htmlFor="nome" className="block text-sm font-medium text-text ml-1">
                Nome de Tripulante
              </label>
              <input
                type="text"
                id="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-overlay-1 border border-overlay-0 rounded-xl text-sm text-white placeholder-subtext-1 focus:outline-none focus:border-[#4ab8e8]/50 focus:ring-1 focus:ring-[#4ab8e8]/50 transition-all duration-300"
                placeholder="Informe seu nome"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-subtext-1 ml-1">
                Frequência (E-mail)
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-overlay-1 border border-overlay-0 rounded-xl text-sm text-white placeholder-subtext-1 focus:outline-none focus:border-[#4ab8e8]/50 focus:ring-1 focus:ring-[#4ab8e8]/50 transition-all duration-300"
                placeholder="contato@base.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="mensagem" className="block text-sm font-medium text-text ml-1">
              Transmissão (Mensagem)
            </label>
            <textarea
              id="mensagem"
              rows={5}
              value={formData.mensagem}
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-overlay-1 border-overlay-0 rounded-xl text-sm text-white placeholder-subtext-1 focus:outline-none focus:border-[#4ab8e8]/50 focus:ring-1 focus:ring-[#4ab8e8]/50 transition-all duration-300 resize-none"
              placeholder="Descreva sua observação ou dúvida..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sapphire hover:bg-biolum text-text font-medium tracking-wide py-3.5 px-4 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(26,106,154,0.4)] hover:shadow-[0_4px_25px_rgba(74,184,232,0.6)] flex justify-center items-center gap-2 mt-4 disabled:opacity-50 disabled:hover:bg-[#1a6a9a] disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Enviando sinal de rádio..." : "Transmitir Mensagem"}
          </button>
        </form>
      </div>
    </div>
  );
}
