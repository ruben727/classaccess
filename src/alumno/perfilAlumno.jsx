import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/alumno.css";

const PerfilAlumno = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    } else {
      window.location.href = "/";
    }
  }, []);

  const irPerfil = () => {
    navigate("/perfilAlumno");
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div className="dashboard-alumno">
      <aside className="sidebar-alumno">
        <h2>Alumno</h2>
        <ul>
          <li onClick={() => navigate("/alumno")}>Inicio</li>
          <li onClick={irPerfil}>Perfil</li>
          <li>Clases</li>
          <li>Calendario escolar</li>
          <li>Historial</li>
          <li className="logout" onClick={cerrarSesion}>Cerrar sesión</li>
        </ul>
      </aside>

      <main className="contenido-alumno">
        <h1>Perfil del Alumno</h1>
        <div className="perfil-info">
          <p><strong>Nombre:</strong> {usuario.nombre_usu} {usuario.ap_usu} {usuario.am_usu}</p>
          <p><strong>Correo:</strong> {usuario.correo_usu}</p>
          <p><strong>Privilegio:</strong> Alumno</p>
          <p><strong>Estatus:</strong> {usuario.estatus_usu === 1 ? "Activo" : "Inactivo"}</p>
        </div>
      </main>
    </div>
  );
};

export default PerfilAlumno;
