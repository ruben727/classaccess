import React, { useEffect, useState } from "react";
import "../styles/maestro.css";
import { useNavigate } from "react-router-dom";
import MenuMaestro from "./menuMaestro";
import axios from "axios";

const PerfilMaestro = () => {
  const [maestro, setMaestro] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/api/perfilprof")
      .then((res) => {
        setMaestro(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener datos del profesor:", err);
      });
  }, []);

  return (
    <div className="dashboard-maestro">
      <MenuMaestro />
      <h1 className="titulo-perfil">Perfil del Maestro</h1>
      <div className="tarjeta-perfil">
        <p><strong>Nombre:</strong> {maestro.nombre_usu} {maestro.ap_usu} {maestro.am_usu}</p>
        <p><strong>Correo:</strong> {maestro.correo_usu}</p>
        <p><strong>Privilegio:</strong> Maestro</p>
        <p><strong>Estatus:</strong> {maestro.estatus_usu === 1 ? "Activo" : "Inactivo"}</p>
      </div>
    </div>
  );
};

export default PerfilMaestro;
