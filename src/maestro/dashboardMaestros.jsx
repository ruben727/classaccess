import React, { useEffect, useState } from "react";
import '../styles/maestro.css'
import { useNavigate } from "react-router-dom";
import MenuMaestro from "./menuMaestro";

const Maestro = () => {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

    if (usuarioGuardado) {
      setNombre(usuarioGuardado.nombre_usu); 
    } else {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="dashboard-maestro">
      <MenuMaestro />
      <main className="contenido-maestro">
        <h1>Bienvenido, {nombre}</h1>
        <p>Selecciona una opción del menú para comenzar.</p>
      </main>
    </div>
  );
};

export default Maestro;
