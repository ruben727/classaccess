import React, { useEffect, useState } from "react";
import "../styles/maestro.css";
import "../styles/perfilMaestro.css";
import axios from "axios";
import MenuMaestro from "./menuMaestro";
import { useNavigate } from "react-router-dom";

const PerfilMaestro = () => {
  const navigate = useNavigate();

    useEffect(() => {
        const usuario = localStorage.getItem("usuario");
        if (!usuario) {
            navigate("/"); // Redirige al login si no hay sesión
        }
    }, [navigate]);

  const [maestro, setMaestro] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
  const id_usu = localStorage.getItem("id_usu");
  if (!id_usu) return;

  axios.get(`http://localhost:3001/api/perfilprof/${id_usu}`)
    .then((res) => {
      setMaestro(res.data);
      setCargando(false);
    })
    .catch((err) => {
      console.error("Error al obtener datos del profesor:", err);
      setCargando(false);
    });
}, []);


  return (
    <div className="dashboard-maestro">
      <MenuMaestro />
      <main className="contenido-maestro">
        <h1 className="titulo-seccion">Perfil del Maestro</h1>
        
        {cargando ? (
          <div className="cargando-perfil">
            <p>Cargando información...</p>
          </div>
        ) : (
          <div className="contenedor-perfil">
            <div className="tarjeta-perfil">
              <div className="campo-perfil">
                <span className="etiqueta-perfil">Nombre:</span>
                <span className="valor-perfil">{maestro.nombre_usu} {maestro.ap_usu} {maestro.am_usu}</span>
              </div>
              
              <div className="campo-perfil">
                <span className="etiqueta-perfil">Correo:</span>
                <span className="valor-perfil">{maestro.correo_usu}</span>
              </div>
              
              <div className="campo-perfil">
                <span className="etiqueta-perfil">No. Empleado:</span>
                <span className="valor-perfil">{maestro.no_empleado}</span>
              </div>
              
              <div className="campo-perfil">
                <span className="etiqueta-perfil">Estatus:</span>
                <span className={`valor-perfil ${maestro.estatus_usu === 1 ? 'activo' : 'inactivo'}`}>
                  {maestro.estatus_usu === 1 ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PerfilMaestro;