import React, { useEffect, useState }from "react";
import '../styles/maestro.css'


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

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

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
                    <li className="logout" onClick={cerrarSesion}>Cerrar sesión</li>
                </ul>
            </aside>
            <main className="contenido-maestro">
                <h1>Bienvenido, {nombre} </h1>
                <p>Selecciona una opción del menú para comenzar.</p>
            </main>
        </div>
    );
};

export default Maestro;
