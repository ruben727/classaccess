import React from "react";
import { useNavigate } from "react-router-dom";

const MenuMaestro = () => {
      const navigate = useNavigate();

  const irInicio = () =>{
    navigate("/maestro");
  }

  const irPerfil = () =>{
    navigate("/perfilMaestro");
  }

  const irHorario = () =>{
    navigate("/horarioMaestro");
  }

  const irCalendario = () =>{
    navigate("/calendarioMaestro");
  }

  const irHistorial = () =>{
    navigate("/historialMaestro");
  }

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };
  const irQr = () => {
    navigate("/Codigo_QR");
  }

    return (
            <aside className="sidebar-maestro">
                <h2>Maestro</h2>
                <ul>
                    <li onClick={irInicio}>Inicio</li>
                    <li onClick={irPerfil}>Perfil</li>
                    <li onClick={irQr}>Codigo QR</li>
                    <li onClick={irHorario}>Horario</li>
                    <li onClick={irCalendario}>Calendario</li>
                    <li onClick={irHistorial}>Historial</li>
                    <li className="logout" onClick={cerrarSesion}>Cerrar sesión</li>
                </ul>
            </aside>
    );
}

export default MenuMaestro;