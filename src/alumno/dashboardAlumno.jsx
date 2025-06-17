import React from "react";
import "../styles/alumno.css";

const Alumno = () => {
    return (
        <div className="dashboard-alumno">
            <aside className="sidebar-alumno">
                <h2>Alumno</h2>
                <ul>
                    <li>Perfil</li>
                    <li>Materias</li>
                    <li>Calificaciones</li>
                    <li>Horario</li>
                    <li>Historial</li>
                    <li className="logout">Cerrar sesión</li>
                </ul>
            </aside>
            <main className="contenido-alumno">
                <h1>Bienvenido, Juan Pérez</h1>
                <p>Selecciona una opción del menú para comenzar.</p>
            </main>
        </div>
    );
};

export default Alumno;
