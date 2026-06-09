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
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-base text-text">
      {/* Background Decorativo Oceoânico */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal opacity-10 blur-[150px] rounded-full mix-blend-screen pointer-events-none transition-transform duration-1000"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-sapphire opacity-40 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      <div className="relative w-full max-w-md p-10 bg-mantle backdrop-blur-xl border border-crust rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.1)] z-10 mx-4">
        
        {/* Cabeçalho Temático */}
        <div className="flex flex-col items-center gap-2 mb-10 text-center">
          <div className="w-20 h-20 mb-2 flex items-center justify-center rounded-full bg-surface-0 border border-surface-1 shadow-[0_0_30px_var(--color-teal)]/20">
            <span 
              className="text-4xl drop-shadow-[0_0_15px_var(--color-teal)]" 
              style={{ animation: "float 4s ease-in-out infinite" }}
              title="Embarcação"
            >
              🚢
            </span>
          </div>
          <h1 className="text-3xl font-light text-text tracking-widest uppercase">
            N.V. Thalassor
          </h1>
          <p className="text-teal text-xs font-mono uppercase tracking-[0.2em] opacity-80 mt-1">
            Acesso à tripulação
          </p>
        </div>

        {/* Mensagem de erro */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-coral/10 border border-coral/30 rounded-xl text-coral text-sm text-center font-light backdrop-blur-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-subtext-0 ml-1"
            >
              E-mail de Identificação
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 bg-surface-0 border border-surface-1 rounded-xl text-sm text-text placeholder-subtext-0 focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/50 transition-all duration-300"
              placeholder="tripulante@thalassor.com"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-subtext-0 ml-1"
            >
              Código de Acesso
            </label>
            <input
              type="password"
              id="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-5 py-3.5 bg-surface-0 border border-surface-1 rounded-xl text-sm text-text placeholder-subtext-0 focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/50 transition-all duration-300"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sapphire hover:bg-teal text-crust font-medium tracking-wide py-3.5 px-4 rounded-xl transition-all duration-300 shadow-[0_4px_20px_var(--color-sapphire)]/40 hover:shadow-[0_4px_25px_var(--color-teal)]/60 flex justify-center items-center gap-2 mt-4 disabled:opacity-50 disabled:hover:bg-sapphire disabled:cursor-not-allowed disabled:hover:shadow-[0_4px_20px_var(--color-sapphire)]/40"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-crust" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
            <p className="text-sm text-subtext-0">
              Ainda não faz parte da tripulação?{" "}
              <Link to="/cadastro" className="text-teal hover:text-sapphire transition-colors duration-300 ml-1">
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
