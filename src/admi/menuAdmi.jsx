import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MenuAdmin = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const irUsuarios = () => {
    navigate("/usuarios");
    setMobileMenuOpen(false);
  };

  const irInicio = () => {
    navigate("/admi");
    setMobileMenuOpen(false);
  };
  
  const irPerfil = () => {
    navigate("/perfilAdmi");
    setMobileMenuOpen(false);
  };

  const irAsistencias = () => {
    navigate("/asistencias");
    setMobileMenuOpen(false);
  };
  
  const irEnviarNotificacioens = () => {
    navigate("/enviarNotificaciones");
    setMobileMenuOpen(false);
  };

  const irReportes = () => {
    navigate("/reportes");
    setMobileMenuOpen(false);
  };

  const irAulas = () => {
    navigate("/aulas");
    setMobileMenuOpen(false);
  };

  const irDispositivos = () => {
    navigate("/dispositivos");
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
    <aside className={`sidebar-administrador ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <h2>Administrador</h2>
      
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
        <li onClick={irUsuarios}>
          <span>Usuarios</span>
        </li>
        <li onClick={irAsistencias}>
          <span>Asistencias</span>
        </li>
        <li onClick={irDispositivos}>
          <span>Dispositivos</span>
        </li>
        <li onClick={irAulas}>
          <span>Aulas</span>
        </li>
        <li onClick={irReportes}>
          <span>Generar reportes</span>
        </li>
        <li onClick={irEnviarNotificacioens}>
          <span>Enviar notificaciones</span>
        </li>
        <li className="logout" onClick={cerrarSesion}>
          <span>Cerrar sesión</span>
        </li>
      </ul>
    </aside>
  );
};

export default MenuAdmin;