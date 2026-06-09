import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { tipoFocoPoluicao } from "../../../types/tipoFocoPoluicao";
const API_URL_FOCOS = "https://thalassor.onrender.com/focos";
export default function FocoNovo() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState<string | null>(null);
    // Inicializa o estado com os campos baseados no tipoFocoPoluicao (sem o idFoco que é gerado pela API)
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Converte para número se o input for do tipo number
      [name]: type === "number" || name === "idRegiao" ||
 name === "idUsuario" ? Number(value) : value,
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
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.erro || errorData.message 
  `Erro ${response.status}: Falha ao criar foco de poluição.`);
      }

      // Se sucesso, redireciona de volta para a lista (dashboard)
      navigate("/dashboard");
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro desconhecido.");
    } finally {
      setLoading(false);
    } 
}
}