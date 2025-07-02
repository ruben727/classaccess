import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/alumno.css";

const MenuAlumno = () => {
  const navigate = useNavigate();

  const irPerfil = () => navigate("/perfilAlumno");
  const irQR_ = ()=> 
    navigate("/CodigoQr");
  const ir_histo = () => 
    navigate ("/historialAlumno");
  const ir_calen = () =>
    navigate("/Calendario");
  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };
  const Notification = () =>
    navigate("/Notificaciones_alumno")
  

  return (
    <aside className="sidebar-alumno">
      <h2>Alumno</h2>
      <ul>
        <li onClick={() => navigate("/alumno")}>Inicio</li>
        <li onClick={irPerfil}>Perfil</li>
        <li onClick={irQR_}>Codigo QR</li>
        <li onClick={ir_calen}>Calendario escolar</li>
        <li onClick={ir_histo}>Historial</li>
        <li onClick={Notification}>Notificaciones</li>
        <li className="logout" onClick={cerrarSesion}>Cerrar sesión</li>
      </ul>
    </aside>
  );
};

export default MenuAlumno;