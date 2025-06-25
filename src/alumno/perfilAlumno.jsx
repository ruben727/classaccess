import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/alumno.css";
import "./menuAlumno";
import MenuAlumno from "./menuAlumno";

const PerfilAlumno = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    } else {
      window.location.href = "/";
    }
  }, []);

  if (!usuario) return <p>Cargando...</p>;

  return (
     <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <MenuAlumno></MenuAlumno>


      <main className="contenido-alumno">
        <h1>Perfil del Alumno</h1>
        <div className="perfil-info">
          <p><strong>Nombre:</strong> {usuario.nombre_usu} {usuario.ap_usu} {usuario.am_usu}</p>
          <p><strong>Correo:</strong> {usuario.correo_usu}</p>
          <p><strong>Privilegio:</strong> Alumno</p>
          <p><strong>Estatus:</strong> {usuario.estatus_usu === 1 ? "Activo" : "Inactivo"}</p>
        </div>
      </main>
    </div>
  );
};

export default PerfilAlumno;
