import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/alumno.css";


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
      window.location.href = "/";
    }
  }, []);

const irPerfil = () => {
    navigate("/perfilAlumno");
  };
const irHistorial = () => {
    navigate("/historialAlumno")
}
const irQr = ()=>{
  navigate("/CodigoQR")
}

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-alumno">
      <aside className="sidebar-alumno">
        <h2>Alumno</h2>
        <ul>
          <li>Inicio</li>
          <li onClick={irPerfil}>Perfil</li>
          <li onClick={irQr}>Codigo Qr</li>
          <li>Clases</li>
          <li>Calendario escolar</li>
          <li onClick={irHistorial}>Historial</li>
          <li className="logout" onClick={cerrarSesion}>Cerrar sesión</li>
        </ul>
      </aside>
      <main className="contenido-alumno">
        <h1>Bienvenido, {nombre}</h1>
        <p>Selecciona una opción del menú para comenzar.</p>
      </main>
    </div>
  );
};

export default Alumno;
