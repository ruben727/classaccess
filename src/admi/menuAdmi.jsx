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

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/");


  };

  return (
 
            <aside className="sidebar-administrador">
                <h2>Administrador</h2>
                <ul>
                    <li onClick={irInicio}>Inicio</li>
                    <li>Perfil</li>
                    <li onClick={irUsuarios}>Usuarios</li>
                    <li>Asistencias</li>
                    <li>Generar reportes</li>
                    <li>Enviar notificaciones</li>
                    <li className="logout" onClick={cerrarSesion}>Cerrar sesión</li>
                </ul>
            </aside>

    );
  
};

export default MenuAdmin;
