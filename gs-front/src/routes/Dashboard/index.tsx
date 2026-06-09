import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import type { tipoFoco } from "../../types/tipoFocoPoluicao";
import type { tipoPrevisao } from "../../types/tipoPrevisao";
import type { tipoSensor } from "../../types/tipoSensor";
import type { tipoRegiao } from "../../types/tipoRegiao";
import type { tipoOrdem } from "../../types/tipoOrdem";


export default function Dashboard() {
  const navigate = useNavigate();

  const [focos, setFocos] = useState<tipoFoco[]>([]);
  const [ordens, setOrdens] = useState<tipoOrdem[]>([]);
  const [previsoes, setPrevisoes] = useState<tipoPrevisao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const API_URL_FOCOS = "https://thalassor.onrender.com/focos";

  const API_URL_ORDENS = "https://thalassor.onrender.com/ordens";

  const API_URL_PREVISOES = "https://thalassor.onrender.com/previsoes";

  const API_URL_REGIOES = "https://thalassor.onrender.com/regioes";

  useEffect(() => {
    fetchData();
  }, []);

  // Função para buscar dados da API

  const fetchData = async () => {

    setLoading(true);

    try {

      // Realizando as chamadas para a API

      const [resFocos, resOrdens, resPrevisoes, resRegioes] = await Promise.all([

        fetch(API_URL_FOCOS),

        fetch(API_URL_ORDENS),

        fetch(API_URL_PREVISOES),

        fetch(API_URL_REGIOES)

      ]);
      // Validando se as respostas são bem-sucedidas

      if (resFocos.ok && resOrdens.ok && resPrevisoes.ok && resRegioes.ok) {

        const dataFocos: tipoFoco[] = await resFocos.json();

        const dataOrdens: tipoOrdem[] = await resOrdens.json();

        const dataPrevisoes: tipoPrevisao[] = await resPrevisoes.json();




        await resRegioes.json();



        setFocos(dataFocos);

        setOrdens(dataOrdens);

        setPrevisoes(dataPrevisoes);



      } else {

        console.error("Falha ao buscar dados de um ou mais endpoints.");

      }

    } catch (error) {

      console.error("Erro na comunicação com o sonar de dados:", error);

    } finally {

      setLoading(false);

    }

  };

  return (
    <div>Dashboard</div>
  );
}
