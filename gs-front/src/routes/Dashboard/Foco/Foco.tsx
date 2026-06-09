import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { tipoFocoPoluicao } from "../../../types/tipoFocoPoluicao";

export default function Foco() {
  const navigate = useNavigate();
  const [focos, setFocos] = useState<tipoFocoPoluicao[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL_FOCOS = "https://thalassor.onrender.com/focos";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL_FOCOS);
        if (res.ok) {
          const dataFocos: tipoFocoPoluicao[] = await res.json();
          setFocos(dataFocos);
        } else {
          console.error("Erro ao buscar focos.");
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const logout = () => {
    sessionStorage.removeItem("usuario");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-base text-text">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-teal border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg font-semibold text-teal">Carregando Focos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base text-text flex flex-col md:flex-row pt-16 md:pt-0">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-mantle backdrop-blur-xl border-r border-crust p-8 flex flex-col">
        <div className="mb-12">
          <h2 className="text-2xl font-light tracking-widest uppercase text-sapphire">Thalassor</h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-subtext-0">Painel de Controle</p>
        </div>

        <nav className="flex-1 space-y-4">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-subtext-1 hover:bg-mantle hover:text-text rounded-xl transition-all">
            <span className="text-xl">📊</span>
            <span className="font-medium">Visão Geral</span>
          </Link>
          <Link to="/focos" className="flex items-center gap-3 px-4 py-3 bg-teal/10 text-teal rounded-xl border border-teal/20 transition-all">
            <span className="text-xl">📍</span>
            <span>Focos de Poluição</span>
          </Link>
          <Link to="/ordens" className="flex items-center gap-3 px-4 py-3 text-subtext-1 hover:bg-surface-0 hover:text-text rounded-xl transition-all">
            <span className="text-xl">📋</span>
            <span>Ordens de Coleta</span>
          </Link>
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-coral hover:bg-coral/10 rounded-xl transition-all"
        >
          <span className="text-xl">🚪</span>
          <span>Encerrar Sessão</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-light">Focos de Poluição</h1>
            <p className="text-subtext-0 mt-1">Lista completa de focos detectados pelo sistema.</p>
          </div>
        </header>

        <div className="bg-base border border-surface-1 rounded-[2rem] overflow-hidden">
          <div className="p-6 border-b border-surface-1 flex justify-between items-center">
            <h3 className="text-lg font-light">Todos os Focos ({focos.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-0 text-xs uppercase tracking-wider text-text">
                <tr>
                  <th className="px-6 py-4 font-medium">ID</th>
                  <th className="px-6 py-4 font-medium">Data Detecção</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Risco</th>
                  <th className="px-6 py-4 font-medium text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-2">
                {focos.map((foco) => (
                  <tr key={foco.idFoco} className="hover:bg-surface-1 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-subtext-0">#{foco.idFoco}</td>
                    <td className="px-6 py-4 text-sm">{foco.dataDeteccao || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] px-2 py-1 rounded-full border ${foco.statusFoco === 'Ativo' ? 'border-coral text-coral bg-coral/10' : 'border-teal text-teal bg-teal/10'}`}>
                        {foco.statusFoco}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] px-2 py-1 rounded-full border ${
                        foco.nivelRisco === 'Alto' ? 'border-coral text-coral bg-coral/10' :
                        foco.nivelRisco === 'Médio' ? 'border-sand text-sand bg-sand/10' :
                        'border-seafoam text-seafoam bg-seafoam/10'
                      }`}>
                        {foco.nivelRisco}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link 
                        to={`/focos/${foco.idFoco}`} 
                        className="text-sapphire hover:text-foam text-sm font-medium transition-colors"
                      >
                        Ver Detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
                {focos.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-subtext-0">
                      Nenhum foco de poluição encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
