import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const API_URL_FOCOS = "https://thalassor.onrender.com/focos"; // URL do backend para obter os focos de incêndio
  const API_URL_PREVISOES = "https://thalassor.onrender.com/previsoes"; // URL do backend para obter as previsões
  const API_URL_SENSORES = "https://thalassor.onrender.com/sensores"; // URL do backend para obter os dados dos sensores
  const API_URL_REGIOES = "https://thalassor.onrender.com/regioes"; // URL do backend para obter as regiões

  return (
  <div>Dashboard</div>
  );
}
