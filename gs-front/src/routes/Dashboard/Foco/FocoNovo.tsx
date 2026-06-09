import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { tipoFocoPoluicao } from "../../../types/tipoFocoPoluicao";

const API_URL_FOCOS = "https://thalassor.onrender.com/focos";

export default function FocoNovo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<tipoFocoPoluicao>>({
    idRegiao: 0,
    idUsuario: 0,
    latitude: 0,
    longitude: 0,
    extensaoKm2: 0,
    indiceFdi: 0,
    urlImagem: "",
    statusFoco: "Ativo",
    dataDeteccao: new Date().toISOString().split("T")[0],
    nivelRisco: "Baixo",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" ||
        name === "idRegiao" ||
        name === "idUsuario"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);

    try {
      const response = await fetch(API_URL_FOCOS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Se o usuário não informar, deixamos como string vazia.
        // No FocoDetalhes, isso fará o app gerar automaticamente a URL do NASA WVS.
        body: JSON.stringify({
          ...formData,
          urlImagem: formData.urlImagem?.trim() ? formData.urlImagem : "",
        }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({}));

        throw new Error(
          errorData.erro ||
            errorData.message ||
            `Erro ${response.status}: Falha ao criar foco de poluição.`
        );
      }

      navigate("/dashboard");
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base text-text p-4 md:py-12 overflow-y-auto">
      <div className="bg-mantle backdrop-blur-xl border border-crust rounded-xl p-8 w-full max-w-3xl shadow-lg">
        <h2
          className="text-3xl font-bold text-teal mb-6 text-center"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Registrar Novo Foco de Poluição
        </h2>

        {erro && (
          <div className="bg-red-500/20 text-red-500 p-3 rounded mb-4">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="idRegiao"
                className="text-sm font-semibold"
              >
                ID Região
              </label>
              <input
                type="number"
                id="idRegiao"
                name="idRegiao"
                value={formData.idRegiao}
                onChange={handleChange}
                required
                className="p-2 rounded bg-crust border border-surface0 focus:border-teal outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="idUsuario"
                className="text-sm font-semibold"
              >
                ID Usuário
              </label>
              <input
                type="number"
                id="idUsuario"
                name="idUsuario"
                value={formData.idUsuario}
                onChange={handleChange}
                required
                className="p-2 rounded bg-crust border border-surface0 focus:border-teal outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="latitude"
                className="text-sm font-semibold"
              >
                Latitude
              </label>
              <input
                type="number"
                step="any"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
                className="p-2 rounded bg-crust border border-surface0 focus:border-teal outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="longitude"
                className="text-sm font-semibold"
              >
                Longitude
              </label>
              <input
                type="number"
                step="any"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
                className="p-2 rounded bg-crust border border-surface0 focus:border-teal outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="extensaoKm2"
                className="text-sm font-semibold"
              >
                Extensão (km²)
              </label>
              <input
                type="number"
                step="any"
                id="extensaoKm2"
                name="extensaoKm2"
                value={formData.extensaoKm2}
                onChange={handleChange}
                required
                className="p-2 rounded bg-crust border border-surface0 focus:border-teal outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="indiceFdi"
                className="text-sm font-semibold"
              >
                Índice FDI
              </label>
              <input
                type="number"
                step="any"
                id="indiceFdi"
                name="indiceFdi"
                value={formData.indiceFdi}
                onChange={handleChange}
                required
                className="p-2 rounded bg-crust border border-surface0 focus:border-teal outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="statusFoco"
                className="text-sm font-semibold"
              >
                Status do Foco
              </label>
              <select
                id="statusFoco"
                name="statusFoco"
                value={formData.statusFoco}
                onChange={handleChange}
                className="p-2 rounded bg-crust border border-surface0 focus:border-teal outline-none transition-colors"
              >
                <option value="DETECTADO">Detectado</option>
                <option value="EM_RECOLHIMENTO">Em Recolhimento</option>
                <option value="LIMPO">Limpo</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="nivelRisco"
                className="text-sm font-semibold"
              >
                Nível de Risco
              </label>
              <select
                id="nivelRisco"
                name="nivelRisco"
                value={formData.nivelRisco}
                onChange={handleChange}
                className="p-2 rounded bg-crust border border-surface0 focus:border-teal outline-none transition-colors"
              >
                <option value="Baixo">Baixo</option>
                <option value="Médio">Médio</option>
                <option value="Alto">Alto</option>
                <option value="Crítico">Crítico</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="dataDeteccao"
                className="text-sm font-semibold"
              >
                Data de Detecção
              </label>
              <input
                type="date"
                id="dataDeteccao"
                name="dataDeteccao"
                value={formData.dataDeteccao}
                onChange={handleChange}
                required
                className="p-2 rounded bg-crust border border-surface0 focus:border-teal outline-none transition-colors"
              />
            </div>

          </div>

          <div className="flex gap-4 mt-6 justify-end border-t border-surface0 pt-4">
            <Link
              to="/dashboard"
              className="px-6 py-2 bg-surface1 hover:bg-surface2 text-text rounded font-semibold transition-all"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-teal-500 hover:bg-teal-400 text-white rounded font-semibold transition-all disabled:opacity-50 shadow-md hover:shadow-teal-500/50"
            >
              {loading ? "Salvando..." : "Salvar Foco"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

