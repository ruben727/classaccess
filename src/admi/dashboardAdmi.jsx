import React from "react";
import "../styles/administrador.css"
import { useNavigate } from "react-router-dom";



const Maestro = () => {
    return (
        <div className="dashboard-administrador">
            <aside className="sidebar-administrador">
                <h2>Administrador</h2>
                <ul>
                    <li>Perfil</li>
                    <li>Usuarios</li>
                    <li>Asistencias</li>
                    <li>Generar reportes</li>
                    <li>Enviar notificaciones</li>
                    <li className="logout">Cerrar sesión</li>
                </ul>
            </aside>
            <main className="contenido-administrador">
                <h1>Bienvenido, Administrador </h1>
                <p>Selecciona una opción del menú para comenzar.</p>
            </main>
        </div>
    );
};

export default Maestro;
