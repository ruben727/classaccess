import React from "react";
import '../styles/maestro.css'


const Maestro = () => {
    return (
        <div className="dashboard-maestro">
            <aside className="sidebar-maestro">
                <h2>Maestro</h2>
                <ul>
                    <li>Perfil</li>
                    <li>Materias</li>
                    <li>Calificaciones</li>
                    <li>Horario</li>
                    <li>Historial</li>
                    <li className="logout">Cerrar sesión</li>
                </ul>
            </aside>
            <main className="contenido-maestro">
                <h1>Bienvenido, Maestro </h1>
                <p>Selecciona una opción del menú para comenzar.</p>
            </main>
        </div>
    );
};

export default Maestro;
