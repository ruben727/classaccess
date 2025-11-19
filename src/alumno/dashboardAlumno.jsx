import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/alumno.css";
import MenuAlumno from "./menuAlumno";

const Alumno = () => {
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar usuario desde localStorage
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

    if (usuarioGuardado) {
      setNombre(usuarioGuardado.nombre_usu);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="alumno-container">
      <MenuAlumno />
      
      <main className="contenido-alumno">
        {/* Header de bienvenida */}
        <div className="welcome-header">
          <h1>¡Bienvenido, {nombre}! </h1>
          <p className="subtitle">Selecciona una opción del menú para comenzar.</p>
        </div>

        {/* Contenedor centrado con imagen */}
        <div className="main-content-card">
          <div className="content-center">
            {/* Aquí va tu imagen - Reemplaza la ruta con tu imagen */}
            <img 
              src="/escuela.png" 
              alt="Dashboard" 
              className="dashboard-image"
            />
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default Alumno;