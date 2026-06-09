import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { tipoFocoPoluicao } from "../../../types/tipoFocoPoluicao";

const API_URL_FOCOS = "https://thalassor.onrender.com/focos";

export default function FocoNovo() {
const navigate = useNavigate();
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
return(
    <></>
);
}