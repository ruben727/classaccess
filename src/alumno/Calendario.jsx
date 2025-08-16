import React, { useEffect, useState } from "react";
import '../styles/maestro.css';
import '../styles/calendario.css';
import MenuAlumno from "./menuAlumno";
import { useNavigate } from "react-router-dom";

const CalendarioMaestro = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const usuario = localStorage.getItem("usuario");
        if (!usuario) {
            navigate("/"); // Redirige al login si no hay sesión
        }
    }, [navigate]);

    return (
        <div className="dashboard-maestro">
            <MenuAlumno />
            <main className="contenido-maestro">
                <h1 className="titulo-calendario">Calendario Escolar</h1>
                
                <div className="contenedor-calendario">
                    {/* Primer calendario */}
                    <div className="tarjeta-calendario">
                        <img
                            src="./calendarioEscolar1.JPG"
                            alt="Calendario 2023-2024"
                            className="imagen-calendario"
                        />
                    </div>
                    
                    {/* Segundo calendario (si lo necesitas) */}
                    {/* <div className="tarjeta-calendario">
                        <img
                            src="./calendarioEscolar2.JPG"
                            alt="Calendario 2023-2024"
                            className="imagen-calendario"
                        />
                    </div> */}
                </div>
            </main>
        </div>
    );
};

export default CalendarioMaestro;