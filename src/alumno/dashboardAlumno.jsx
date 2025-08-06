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
      setNombre(usuarioGuardado.nombre_usu); // Usa el campo correcto desde tu BD
    } else {
      // Redirige si no hay sesión activa
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="alumno-container">
      {/* Sidebar */}
      <MenuAlumno />
      
      <main className="contenido-alumno">
        <h1>Bienvenido, {nombre}</h1>
        <p>Selecciona una opción del menú para comenzar.</p>
      </main>
    </div>
  );
};

export default Alumno;