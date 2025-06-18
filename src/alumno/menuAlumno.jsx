import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/alumno.css";

const MenuAlumno = () => {
  const navigate = useNavigate();

  const irPerfil = () => navigate("/perfilAlumno");
  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  return (
    <aside className="sidebar-alumno">
      <h2>Alumno</h2>
      <ul>
        <li onClick={() => navigate("/alumno")}>Inicio</li>
        <li onClick={irPerfil}>Perfil</li>
        <li>Clases</li>
        <li>Calendario escolar</li>
        <li>Historial</li>
        <li className="logout" onClick={cerrarSesion}>Cerrar sesión</li>
      </ul>
    </aside>
  );
};

export default MenuAlumno;