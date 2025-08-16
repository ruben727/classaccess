import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/maestro.css";
import "../styles/historialMaestro.css";
import MenuAlumno from "./menuAlumno";
import { useNavigate } from "react-router-dom";

const HistorialMaestros = () => {
  const navigate = useNavigate();
  

    useEffect(() => {
        const usuario = localStorage.getItem("usuario");
        if (!usuario) {
            navigate("/"); // Redirige al login si no hay sesión
        }
    }, [navigate]);

  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);
  const id_usu = localStorage.getItem("id_usu");

  useEffect(() => {
    if (!id_usu) return;

    setCargando(true);
    axios.get(`http://localhost:3001/api/alumno/historial/${id_usu}`)
      .then((res) => {
        setHistorial(res.data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al obtener historial:", err);
        setCargando(false);
      });
  }, [id_usu]);

  return (
    <div className="dashboard-maestro">
      <MenuAlumno />
      
      <main className="contenido-maestro">
        <h1 className="titulo-seccion">Historial de Asistencias</h1>
        
        {cargando ? (
          <div className="cargando-historial">
            <p>Cargando historial...</p>
          </div>
        ) : historial.length === 0 ? (
          <div className="sin-registros">
            <p>No se encontraron registros de asistencia</p>
          </div>
        ) : (
          <div className="contenedor-tabla">
            <div className="tabla-responsive">
              <table className="tabla-historial">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Entrada</th>
                    <th>Salida</th>
                    <th>Aula</th>
                    <th>Edificio</th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((registro, index) => (
                    <tr key={index}>
                      <td data-label="Fecha">{new Date(registro.fecha).toLocaleDateString('es-MX')}</td>
                      <td data-label="Entrada">{registro.hora_entrada || "-"}</td>
                      <td data-label="Salida">{registro.hora_salida || "-"}</td>
                      <td data-label="Aula">{registro.nombre_aula || "Sin aula"}</td>
                      <td data-label="Edificio">{registro.edificio || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HistorialMaestros;