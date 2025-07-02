// src/maestro/perfilMaestro.jsx
import React, { useEffect, useState } from "react";
import "../styles/maestro.css";
import axios from "axios";
import MenuMaestro from "./menuMaestro";

const PerfilMaestro = () => {
  const [maestro, setMaestro] = useState({});

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
      <div className="contenido-maestro">
      <h1 className="titulo-perfil">Perfil del Maestro</h1>
      <div className="tarjeta-perfil">
        <p><strong>Nombre:</strong> {maestro.nombre_usu} {maestro.ap_usu} {maestro.am_usu}</p>
        <p><strong>Correo:</strong> {maestro.correo_usu}</p>
        <p><strong>No. Empleado:</strong> {maestro.no_empleado}</p>
        <p><strong>Estatus:</strong> {maestro.estatus_usu === 1 ? "Activo" : "Inactivo"}</p>
      </div>
      </div>
    </div>
  );
};

export default PerfilMaestro;
