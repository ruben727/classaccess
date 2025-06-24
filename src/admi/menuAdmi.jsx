// src/components/SidebarAdmin.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const MenuAdmin = () => {
  const navigate = useNavigate();

  const irUsuarios = () =>{
    navigate("/usuarios");
  }
  const irInicio = () =>{
    navigate("/admi");
    }
    
  const irPerfil = () =>{
    navigate("/perfilAdmi");
  }

  const irAsistencias = () =>{
    navigate("/asistencias");
  }
  
  const irEnviarNotificacioens = () =>{
    navigate("/enviarNotificaciones")
  }

  const irReportes = () =>{
    navigate("/reportes")
  }

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
 
            <aside className="sidebar-administrador">
                <h2>Administrador</h2>
                <ul>
                    <li onClick={irInicio}>Inicio</li>
                    <li onClick={irPerfil}>Perfil</li>
                    <li onClick={irUsuarios}>Usuarios</li>
                    <li onClick={irAsistencias}>Asistencias</li>
                    <li onClick={irReportes}>Generar reportes</li>
                    <li onClick={irEnviarNotificacioens}>Enviar notificaciones</li>
                    <li className="logout" onClick={cerrarSesion}>Cerrar sesión</li>
                </ul>
            </aside>

    );
  
};

export default MenuAdmin;
