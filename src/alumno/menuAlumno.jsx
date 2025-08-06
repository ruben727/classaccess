import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MenuAlumno = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const irInicio = () => {
    navigate("/alumno");
    setMobileMenuOpen(false);
  };
  
  const irPerfil = () => {
    navigate("/perfilAlumno");
    setMobileMenuOpen(false);
  };

  const irQR = () => {
    navigate("/CodigoQr");
    setMobileMenuOpen(false);
  };
  
  const irCalendario = () => {
    navigate("/Calendario");
    setMobileMenuOpen(false);
  };

  const irHistorial = () => {
    navigate("/historialAlumno");
    setMobileMenuOpen(false);
  };

  const irNotificaciones = () => {
    navigate("/Notificaciones_alumno");
    setMobileMenuOpen(false);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <aside className={`sidebar-alumno ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <h2>Alumno</h2>
      
      {/* Botón hamburguesa para móviles */}
      <div className="menu-toggle" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <ul>
        <li onClick={irInicio}>
          <span>Inicio</span>
        </li>
        <li onClick={irPerfil}>
          <span>Perfil</span>
        </li>
        <li onClick={irQR}>
          <span>Código QR</span>
        </li>
        <li onClick={irCalendario}>
          <span>Calendario Escolar</span>
        </li>
        <li onClick={irHistorial}>
          <span>Historial</span>
        </li>
        <li onClick={irNotificaciones}>
          <span>Notificaciones</span>
        </li>
        <li className="logout" onClick={cerrarSesion}>
          <span>Cerrar sesión</span>
        </li>
      </ul>
    </aside>
  );
};

export default MenuAlumno;