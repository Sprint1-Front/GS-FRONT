import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import type { tipoFocoPoluicao } from "../../types/tipoFocoPoluicao";
import type { TipoPrevisaoIA } from "../../types/tipoPrevisaoIA";
import type { tipoRegiao } from "../../types/tipoRegiao";
import type { tipoOrdemColeta } from "../../types/tipoOrdemColeta";


export default function Dashboard() {
  const navigate = useNavigate();

  const [focos, setFocos] = useState<tipoFocoPoluicao[]>([]);
  const [ordens, setOrdens] = useState<tipoOrdemColeta[]>([]);
  const [previsoes, setPrevisoes] = useState<TipoPrevisaoIA[]>([]);
  const [loading, setLoading] = useState(true);
  const [regioes, setRegioes] = useState<tipoRegiao[]>([]);

  const API_URL_FOCOS = "https://thalassor.onrender.com/focos";
  const API_URL_ORDENS = "https://thalassor.onrender.com/ordens";
  const API_URL_PREVISOES = "https://thalassor.onrender.com/previsoes";
  const API_URL_REGIOES = "https://thalassor.onrender.com/regioes";
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [resFocos, resOrdens, resPrevisoes, resRegioes] = await Promise.all([
          fetch(API_URL_FOCOS),
          fetch(API_URL_ORDENS),
          fetch(API_URL_PREVISOES),
          fetch(API_URL_REGIOES)
        ]);

        if (resFocos.ok && resOrdens.ok && resPrevisoes.ok && resRegioes.ok) {
          const dataFocos: tipoFocoPoluicao[] = await resFocos.json();
          const dataOrdens: tipoOrdemColeta[] = await resOrdens.json();
          const dataPrevisoes: TipoPrevisaoIA[] = await resPrevisoes.json();
          const dataRegioes: tipoRegiao[] = await resRegioes.json();

          setRegioes(dataRegioes);
          setFocos(dataFocos);
          setOrdens(dataOrdens);
          setPrevisoes(dataPrevisoes);
        } else {
          console.error("Erro nas leituras do sonar.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteFoco = async (id: number) => {
    if (!window.confirm("Deseja realmente excluir este foco?")) return;
    try {
      const response = await fetch(`${API_URL_FOCOS}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setFocos(focos.filter((foco) => foco.idFoco !== id));
      } else {
        console.error("Erro ao deletar foco.");
      }
    } catch (error) {
      console.error("Erro ao deletar foco:", error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("usuario");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg font-semibold text-blue-600">Carregando Dashboard...</div>
        </div>
      </div>
    );
  }

  const focoAtivos = focos.filter(f => f.statusFoco === "Ativo").length;
  const ordemPendentes = focos.filter(f => f.statusFoco === "Inativo").length
  const riscoAlto = focos.filter(f => f.nivelRisco === "Alto").length;
  const riscoMedio = focos.filter(f => f.nivelRisco === "Médio").length;
  const riscoBaixo = focos.filter(f => f.nivelRisco === "Baixo").length;

  return (
    <div className="min-h-screen bg-[var(--color-base)] text-[var(--color-text)] flex flex-col md:flex-row pt-16 md:pt-0">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[var(--color-mantle)] backdrop-blur-xl border-r border-[var(--color-crust)] p-8 flex flex-col">
        <div className="mb-12">
          <h2 className="text-2xl font-light tracking-widest uppercase text-sapphire">Thalassor</h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-subtext-0">Painel de Controle</p>
        </div>

        <nav className="flex-1 space-y-4">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-[var(--color-teal)]/10 text-[var(--color-teal)] rounded-xl border border-[var(--color-teal)]/20 transition-all">
            <span className="text-xl">📊</span>
            <span className="font-medium">Visão Geral</span>
          </Link>
          <Link to="/focos" className="flex items-center gap-3 px-4 py-3 text-[var(--color-subtext-1)] hover:bg-[var(--color-mantle)] hover:text-text rounded-xl transition-all">
            <span className="text-xl">📍</span>
            <span>Focos de Poluição</span>
          </Link>
          <Link to="/ordens" className="flex items-center gap-3 px-4 py-3 text-[var(--color-subtext-1)] hover:bg-surface-0 hover:text-text rounded-xl transition-all">
            <span className="text-xl">📋</span>
            <span>Ordens de Coleta</span>
          </Link>
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-[var(--color-coral)] hover:bg-[var(--color-coral)]/10 rounded-xl transition-all"
        >
          <span className="text-xl">🚪</span>
          <span>Encerrar Sessão</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-light">Monitoramento Oceânico</h1>
            <p className="text-[var(--color-subtext-0)] mt-1">Status em tempo real das operações de limpeza.</p>
          </div>
          <div className="bg-surface-0 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4">
            <div className="w-2 h-2 bg-[var(--color-teal)] rounded-full animate-pulse"></div>
            <span className="text-sm font-mono text-[var(--color-text)]">Sonar Ativo</span>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-surface-0 border border-[var(--color-crust)] p-6 rounded-[2rem] backdrop-blur-sm">
            <p className="text-[var(--color-subtext-0)] text-xs uppercase tracking-widest mb-2">Focos Ativos</p>
            <p className="text-4xl font-light text-[var(--color-sapphire)]">{focoAtivos}</p>
          </div>
          <div className="bg-surface-0 border border-[var(--color-crust)] p-6 rounded-[2rem] backdrop-blur-sm">
            <p className="text-[var(--color-subtext-0)] text-xs uppercase tracking-widest mb-2">Risco Crítico</p>
            <p className="text-4xl font-light text-[var(--color-coral)]">{riscoAlto}</p>
          </div>
          <div className="bg-surface-0 border border-[var(--color-crust)] p-6 rounded-[2rem] backdrop-blur-sm">
            <p className="text-[var(--color-subtext-0)] text-xs uppercase tracking-widest mb-2">Ordens Pendentes</p>
            <p className="text-4xl font-light text-[var(--color-yellow)]">{ordemPendentes}</p>
          </div>
          <div className="bg-surface-0 border border-[var(--color-crust)] p-6 rounded-[2rem] backdrop-blur-sm">
            <p className="text-[var(--color-subtext-0)] text-xs uppercase tracking-widest mb-2">Regiões Mapeadas</p>
            <p className="text-4xl font-light text-[var(--color-teal)]">{regioes.length}</p>
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Focos Table */}
          <div className="bg-[var(--color-base)] border border-[var(--color-surface-1)] rounded-[2rem] overflow-hidden">
            <div className="p-6 border-b border-[var(--color-surface-1)] flex justify-between items-center">
              <h3 className="text-lg font-light">Focos Recentes</h3>
              <Link to="/focos/novo" className="text-xs bg-[var(--color-sapphire)] hover:bg-[var(--color-sky)] text-[var(--color-text)] px-4 py-2 rounded-full transition-all">
                + Novo Foco
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[var(--color-base)] text-xs uppercase tracking-wider text-[var(--color-text)]">
                  <tr>
                    <th className="px-6 py-4 font-medium">Localização</th>
                    <th className="px-6 py-4 font-medium">Risco</th>
                    <th className="px-6 py-4 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-surface-2)]">
                  {focos.slice(0, 5).map((foco) => (
                    <tr key={foco.idFoco} className="hover:bg-surface-0 transition-colors">
                      <td className="px-6 py-4 text-sm">{foco.idRegiao}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] px-2 py-1 rounded-full border ${foco.nivelRisco === 'Alto' ? 'border-[var(--color-coral)] text-[var(--color-coral)] bg-red-500/10' :
                            foco.nivelRisco === 'Médio' ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10' :
                              'border-green-500/50 text-green-400 bg-green-500/10'
                          }`}>
                          {foco.nivelRisco}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDeleteFoco(foco.idFoco)} className="text-[var(--color-coral)] hover:text-red-300 text-sm">Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
