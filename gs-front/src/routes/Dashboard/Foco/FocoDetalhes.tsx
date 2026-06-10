import  { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { tipoFocoPoluicao } from "../../../types/tipoFocoPoluicao";

export default function FocoDetalhes() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [foco, setFoco] = useState<tipoFocoPoluicao | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL_FOCO = `https://thalassor.onrender.com/focos/${id}`;

  useEffect(() => {
    const fetchFoco = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL_FOCO);
        if (res.ok) {
          const data = await res.json();
          setFoco(data);
        } else {
          console.error("Foco não encontrado");
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchFoco();
  }, [id]);

  const logout = () => {
    sessionStorage.removeItem("usuario");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-base text-text">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-teal border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg font-semibold text-teal">Buscando detalhes...</div>
        </div>
      </div>
    );
  }

  if (!foco) {
    return (
      <div className="min-h-screen bg-base text-text flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-display text-coral mb-4">Foco Não Encontrado</h1>
        <p className="text-subtext-0 mb-8">O foco de poluição que você procura não existe ou foi removido.</p>
        <Link to="/focos" className="bg-surface-1 px-6 py-2 rounded-xl text-text hover:bg-surface-2 transition-colors">
          Voltar para Focos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base text-text flex flex-col md:flex-row pt-16 md:pt-0">
      {/* Sidebar (Simplificada) */}
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

        <button onClick={logout} className="mt-auto flex items-center gap-3 px-4 py-3 text-coral hover:bg-coral/10 rounded-xl transition-all">
          <span className="text-xl">🚪</span>
          <span>Encerrar Sessão</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8 flex items-center gap-4">
          <Link to="/focos" className="text-subtext-0 hover:text-text transition-colors p-2 bg-surface-1 rounded-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <div>
            <h1 className="text-3xl font-light">Detalhes do Foco #{foco.idFoco}</h1>
            <p className="text-subtext-0 mt-1">Análise detalhada da região afetada.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card de Informações Principais */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-surface-0 border border-surface-1 rounded-[2rem] p-8">
              <h2 className="text-xl font-medium mb-6 flex items-center gap-3">
                <span>📋</span> Dados do Incidente
              </h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-subtext-0 uppercase tracking-wider mb-1">Status</p>
                  <p className="text-lg font-medium">
                    <span className={`inline-flex items-center gap-2 ${foco.statusFoco === 'Ativo' ? 'text-coral' : 'text-teal'}`}>
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      {foco.statusFoco}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-subtext-0 uppercase tracking-wider mb-1">Nível de Risco</p>
                  <p className="text-lg font-medium">{foco.nivelRisco}</p>
                </div>
                <div>
                  <p className="text-xs text-subtext-0 uppercase tracking-wider mb-1">Data de Detecção</p>
                  <p className="text-lg">{foco.dataDeteccao || "Não registrada"}</p>
                </div>
                <div>
                  <p className="text-xs text-subtext-0 uppercase tracking-wider mb-1">Extensão (km²)</p>
                  <p className="text-lg">{foco.extensaoKm2} km²</p>
                </div>
                <div>
                  <p className="text-xs text-subtext-0 uppercase tracking-wider mb-1">Índice FDI</p>
                  <p className="text-lg">{foco.indiceFdi}</p>
                </div>
                <div>
                  <p className="text-xs text-subtext-0 uppercase tracking-wider mb-1">ID Região Associada</p>
                  <p className="text-lg font-mono text-subtext-1">#{foco.idRegiao}</p>
                </div>
              </div>
            </div>

            {/* Localização Geográfica */}
            <div className="bg-surface-0 border border-surface-1 rounded-[2rem] p-8">
              <h2 className="text-xl font-medium mb-6 flex items-center gap-3">
                <span>🧭</span> Localização Geográfica
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-surface-1 p-4 rounded-xl">
                  <p className="text-xs text-subtext-0 uppercase tracking-wider mb-1">Latitude</p>
                  <p className="text-xl font-mono">{foco.latitude}</p>
                </div>
                <div className="bg-surface-1 p-4 rounded-xl">
                  <p className="text-xs text-subtext-0 uppercase tracking-wider mb-1">Longitude</p>
                  <p className="text-xl font-mono">{foco.longitude}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Lateral (Imagem ou Mídia) */}
          <div className="lg:col-span-1">
            <div className="bg-surface-0 border border-surface-1 rounded-[2rem] p-6 h-full flex flex-col">
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <span>📷</span> Captura Espacial (NASA)
              </h2>
              <div className="flex-1 bg-mantle rounded-xl border border-crust flex items-center justify-center overflow-hidden min-h-[300px]">
                {(() => {
                  const lat = Number(foco.latitude);
                  const lon = Number(foco.longitude);

                  const offset = 0.2;
                  const minLat = (lat - offset).toFixed(6);
                  const minLon = (lon - offset).toFixed(6);
                  const maxLat = (lat + offset).toFixed(6);
                  const maxLon = (lon + offset).toFixed(6);

                  
                  let dateStr = "2024-05-31"; 
                  if (foco.dataDeteccao) {
                      // Extract YYYY-MM-DD
                      const match = foco.dataDeteccao.match(/(\d{4}-\d{2}-\d{2})/);
                      if(match) dateStr = match[1];
                  }

                  const nasaWvsUrl = `https://wvs.earthdata.nasa.gov/?LAYERS=MODIS_Terra_CorrectedReflectance_TrueColor&CRS=EPSG%3A4326&TIME=${dateStr}&COORDINATES=${minLat},${minLon},${maxLat},${maxLon}&FORMAT=image%2Fjpeg&RESOLUTION=250m&AUTOSCALE=TRUE`;

                  return (
                    <img 
                      src={foco.urlImagem || nasaWvsUrl} 
                      alt={`Foco ${foco.idFoco}`} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<div class="text-center p-6 text-subtext-0"><span class="text-4xl block mb-2 opacity-50">🌊</span><p class="text-sm">Sem imagem visual disponível para este foco.</p></div>';
                      }}
                    />
                  );
                })()}
              </div>
              
              <div className="mt-6 pt-6 border-t border-surface-1">
                <button className="w-full py-3 bg-teal hover:bg-foam text-crust font-medium rounded-xl transition-colors">
                  Gerar Ordem de Coleta
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
