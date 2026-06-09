import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { TipoUsuario } from "../../types/tipoUsuario";

export default function Login() {
  const navigate = useNavigate();

  // Estados para capturar os inputs e erros
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

    const API_URL = "https://thalassor.onrender.com/usuarios"; // URL do backend para autenticação 

  // Função acionada ao enviar o formulário
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      // Fazendo a requisição GET para buscar a lista de usuários
      const response = await fetch(API_URL);

      if (response.ok) {
        const usuarios: TipoUsuario[] = await response.json();
        
        // Verifica se há um usuário com o mesmo email e senha informados
        const usuarioLogado = usuarios.find(
          (user) => user.email === email && user.senha === senha
        );

        if (usuarioLogado) {
          // Sucesso no login! Salvar na sessão
          sessionStorage.setItem("usuario", JSON.stringify(usuarioLogado));
          
          // Redirecionar para o Dashboard (ou Home)
          navigate("/dashboard");
        } else {
          setErrorMsg("E-mail ou senha incorretos. A profundidade recusa seu acesso.");
        }
      } else {
        setErrorMsg("Erro nas leituras do sonar. Tente novamente mais tarde.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErrorMsg("Falha na comunicação. O servidor de superfície está operante?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-[#030810] text-white">
      {/* Background Decorativo Oceoânico */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#4ab8e8] opacity-10 blur-[150px] rounded-full mix-blend-screen pointer-events-none transition-transform duration-1000"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#0d3a58] opacity-40 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      <div className="relative w-full max-w-md p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-10 mx-4">
        
        {/* Cabeçalho Temático */}
        <div className="flex flex-col items-center gap-2 mb-10 text-center">
          <div className="w-20 h-20 mb-2 flex items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(74,184,232,0.15)]">
            <span 
              className="text-4xl drop-shadow-[0_0_15px_rgba(74,184,232,0.6)]" 
              style={{ animation: "float 4s ease-in-out infinite" }}
              title="Embarcação"
            >
              🚢
            </span>
          </div>
          <h1 className="text-3xl font-light text-white tracking-widest uppercase">
            N.V. Thalassor
          </h1>
          <p className="text-[#4ab8e8] text-xs font-mono uppercase tracking-[0.2em] opacity-80 mt-1">
            Acesso à tripulação
          </p>
        </div>

        {/* Mensagem de erro */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 text-sm text-center font-light backdrop-blur-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white/70 ml-1"
            >
              E-mail de Identificação
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 bg-black/20 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#4ab8e8]/50 focus:ring-1 focus:ring-[#4ab8e8]/50 transition-all duration-300"
              placeholder="tripulante@thalassor.com"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white/70 ml-1"
            >
              Código de Acesso
            </label>
            <input
              type="password"
              id="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-5 py-3.5 bg-black/20 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#4ab8e8]/50 focus:ring-1 focus:ring-[#4ab8e8]/50 transition-all duration-300"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1a6a9a] hover:bg-[#4ab8e8] text-white font-medium tracking-wide py-3.5 px-4 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(26,106,154,0.4)] hover:shadow-[0_4px_25px_rgba(74,184,232,0.6)] flex justify-center items-center gap-2 mt-4 disabled:opacity-50 disabled:hover:bg-[#1a6a9a] disabled:cursor-not-allowed disabled:hover:shadow-[0_4px_20px_rgba(26,106,154,0.4)]"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Autenticando sonar...
              </span>
            ) : (
              "Mergulhar"
            )}
          </button>

          <div className="pt-4 text-center">
            <p className="text-sm text-white/50">
              Ainda não faz parte da tripulação?{" "}
              <Link to="/cadastro" className="text-[#4ab8e8] hover:text-white transition-colors duration-300 ml-1">
                Alistar-se agora
              </Link>
            </p>
          </div>
        </form>
      </div>
      
      {/* Estilo para animação de flutuar local do ícone do barco */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-3deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
