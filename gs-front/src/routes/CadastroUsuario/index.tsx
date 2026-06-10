import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

type Perfil = "CAPITAO" | "ANALISTA"

export default function Register() {
  const navigate = useNavigate()

  const [nomeUsuario, setNomeUsuario] = useState("")
  const [email, setEmail]             = useState("")
  const [senha, setSenha]             = useState("")
  const [senha2, setSenha2]           = useState("")
  const [perfil, setPerfil]           = useState<Perfil | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess]           = useState(false)
  const [errorMsg, setErrorMsg]         = useState<string | null>(null)

  const API_URL = "http://localhost:8080/usuarios"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    // validações
    if (!nomeUsuario.trim()) return setErrorMsg("Nome do tripulante é obrigatório.")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setErrorMsg("E-mail inválido.")
    if (senha.length < 6) return setErrorMsg("Senha deve ter no mínimo 6 caracteres.")
    if (senha !== senha2) return setErrorMsg("As senhas não coincidem.")
    if (!perfil) return setErrorMsg("Selecione uma patente.")

    setIsSubmitting(true)

    const novoUsuario = {
      nomeUsuario: nomeUsuario.trim(),
      email:       email.trim(),
      senha:       senha,
      perfil:      perfil,
    }

    try {
      // 1. Verifica no banco JSON se o e-mail já existe
      const checkResponse = await fetch(`${API_URL}?email=${email.trim()}`)
      const usuariosExistentes = await checkResponse.json()

      if (usuariosExistentes.length > 0) {
        setErrorMsg("E-mail já cadastrado a bordo.")
        setIsSubmitting(false)
        return
      }

      // Adiciona a data de cadastro para simular o comportamento de um banco completo
      const usuarioFinal = {
        ...novoUsuario,
        dataCadastro: new Date().toISOString()
      }

      // 2. Se não existir, realiza o cadastro (POST)
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept":       "application/json",
        },
        body: JSON.stringify(usuarioFinal),
      })

      if (response.ok || response.status === 201) {
        setSuccess(true)
        setTimeout(() => navigate("/login"), 2500)
      } else {
        throw new Error(`Erro no servidor. Status: ${response.status}`)
      }
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error)
      setErrorMsg("Falha ao salvar o cadastro. Verifique a conexão com o servidor.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return (
      localStorage.theme === 'dark' ||
      (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
  })

  useEffect(() => {
    // keep state in sync with the root `dark` class (Header toggles this)
    const doc = document.documentElement
    const obs = new MutationObserver(() => setIsDarkTheme(doc.classList.contains('dark')))
    obs.observe(doc, { attributes: true, attributeFilter: ['class'] })
    // ensure initial value matches current document
    setIsDarkTheme(doc.classList.contains('dark'))
    return () => obs.disconnect()
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-base font-sans"
      style={isDarkTheme ? { backgroundImage: "radial-gradient(circle at top, #0f172a 0%, #020617 70%)" } : undefined}
    >
      {/* Cabeçalho Thematico */}
      <div className="flex flex-col items-center gap-2 mb-10">
        <span className="text-6xl drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]" style={{ animation: "float 4s ease-in-out infinite" }}>🚢</span>
        <h1 className="text-3xl md:text-4xl font-light text-text tracking-wider mt-2">
          N.V. Thalassor
        </h1>
        <p className="text-biolum text-xs font-mono uppercase tracking-[0.3em] opacity-80">
          Registro de Tripulação
        </p>
      </div>

      {/* Container Principal */}
      <div className="w-full max-w-lg relative bg-base backdrop-blur-xl border border-overlay-1 rounded-2xl shadow-2xl overflow-hidden shadow-[#0ea5e9]/10">

        {/* Header do Card */}
        <div className="flex items-center justify-between px-8 py-5 bg-crust border-b border-[#1e293b]">
          <div>
            <p className="text-lg font-serif italic text-sapphire">
              Ficha de Embarque
            </p>
            <p className="text-[10px] font-mono text-subtext-0 tracking-widest mt-1">
              FORM-TCR-2026 · CONFIDENCIAL
            </p>
          </div>
          <span className={`font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all duration-300 ${
            success 
              ? "text-[#10b981] border-[#10b981]/30 bg-[#10b981]/10" 
              : "text-[#38bdf8] border-[#38bdf8]/30 bg-[#38bdf8]/10"
          }`}>
            {success ? "Aprovado" : "Aguardando"}
          </span>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="px-8 py-8 flex flex-col gap-6">

          {errorMsg && (
            <div className="text-xs font-mono text-[#fca5a5] bg-[#7f1d1d]/20 border border-[#fca5a5]/30 rounded-lg p-4 flex items-center gap-3 animate-pulse">
              <span>⚠️</span> {errorMsg}
            </div>
          )}

          <div className="space-y-5">
            <Field label="Nome do Tripulante">
              <input
                type="text"
                required
                value={nomeUsuario}
                onChange={e => setNomeUsuario(e.target.value)}
                placeholder="Ex: Almirante Silva"
                className="w-full bg-transparent border-none text-[var(--color-text)] placeholder-[var(--color-subtext-1)] text-base focus:ring-0 p-0"
              />
            </Field>

            <Field label="Endereço de Rádio (e-mail)">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="contato@oceano.com"
                className="w-full bg-transparent border-none text-[var(--color-text)] placeholder-[var(--color-subtext-1)] text-base focus:ring-0 p-0"
              />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Senha de Acesso">
                <input
                  type="password"
                  required
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-none text-[var(--color-text)] placeholder-[var(--color-subtext-1)] text-base focus:ring-0 p-0"
                />
              </Field>
              <Field label="Confirmar Senha">
                <input
                  type="password"
                  required
                  value={senha2}
                  onChange={e => setSenha2(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-none text-[var(--color-text)] placeholder-[var(--color-subtext-1)] text-base focus:ring-0 p-0"
                />
              </Field>
            </div>
          </div>

          {/* Seção Patente */}
          <div className="mt-4 pt-6 border-t border-[#1e293b]">
            <label className="block text-[10px] font-mono text-[#64748b] uppercase tracking-[0.2em] mb-4">
              Designação a Bordo (Patente)
            </label>
            <div className="grid grid-cols-2 gap-4">
              {(["CAPITAO", "ANALISTA"] as Perfil[]).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPerfil(p)}
                  className={`relative flex flex-col items-center p-4 rounded-xl border transition-all duration-300 group ${
                    perfil === p 
                      ? "bg-[#0ea5e9]/10 border-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.15)]" 
                      : "bg-[#1e293b]/30 border-[#334155] hover:border-[#475569] hover:bg-[#1e293b]/50"
                  }`}
                >
                  <div className={`text-3xl mb-2 transition-transform duration-300 ${perfil === p ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {p === "CAPITAO" ? "⚓" : "🔬"}
                  </div>
                  <div className={`text-xs font-mono uppercase tracking-widest font-semibold ${perfil === p ? 'text-[#38bdf8]' : 'text-[#94a3b8]'}`}>
                    {p === "CAPITAO" ? "Capitão" : "Analista"}
                  </div>
                  <div className="text-[10px] text-[#64748b] font-light mt-1 text-center">
                    {p === "CAPITAO" ? "Comando e Navegação" : "Pesquisa e Dados"}
                  </div>
                  {perfil === p && (
                    <div className="absolute top-2 right-2 text-[#38bdf8]">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Footer do Formulário */}
          <div className="flex items-center justify-between pt-6 mt-2 border-t border-[#1e293b]">
            <p className="text-xs text-[#64748b] font-mono">
              Já tripulante?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-[#38bdf8] hover:text-[#7dd3fc] hover:underline underline-offset-4 transition-colors"
              >
                Acessar bordo
              </button>
            </p>
            <button
              type="submit"
              disabled={isSubmitting || success}
              className={`font-mono text-xs uppercase tracking-[0.2em] font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
                isSubmitting || success 
                  ? "bg-[#1e293b] text-[#475569] cursor-not-allowed border border-[#334155]" 
                  : "bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white hover:from-[#0369a1] hover:to-[#075985] shadow-lg shadow-[#0284c7]/20 hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? (
                 <span className="flex items-center gap-2">
                   <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Processando
                 </span>
              ) : success ? "A bordo ✓" : "Embarcar →"}
            </button>
          </div>
        </form>

        {/* Overlay de Sucesso */}
        {success && (
          <div className={`absolute inset-0 ${isDarkTheme ? 'bg-[#020617]/95' : 'bg-[var(--color-base)]/95'} backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-10 animate-in fade-in duration-500`}>
            <span className="text-7xl drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]" style={{ animation: "float 3s ease-in-out infinite" }}>⚓</span>
            <p className="font-serif text-3xl italic text-[#bae6fd]">
              Bem-vindo a bordo
            </p>
            <p className="font-mono text-sm text-[#38bdf8] tracking-[0.2em] uppercase bg-[#38bdf8]/10 px-4 py-2 rounded-full border border-[#38bdf8]/30">
              {perfil} · {nomeUsuario.toUpperCase()}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}

function Field({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="group">
      <label className="block text-[10px] font-mono text-[#64748b] uppercase tracking-[0.2em] mb-2 group-focus-within:text-[#38bdf8] transition-colors">
        {label}
      </label>
      <div className="border-b border-[#334155] pb-2 group-focus-within:border-[#38bdf8] transition-colors">
        {children}
      </div>
    </div>
  )
}