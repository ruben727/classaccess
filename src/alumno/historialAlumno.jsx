import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuAlumno from "./menuAlumno";
import "../styles/alumno.css";

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const id_usu = localStorage.getItem("id_usu");

  useEffect(() => {
    if (!id_usu) return;

    axios
      .get(`http://localhost:3001/api/alumno/historial/${id_usu}`)
      .then((res) => setHistorial(res.data))
      .catch((err) => console.error("Error al obtener historial:", err));
  }, [id_usu]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <MenuAlumno />

      <div className="historial-contenido">
  <h2 className="titulo">Historial de Entradas</h2>

  <table className="tabla-historial">
    <thead>
      <tr>
        <th>Fecha</th>
        <th>Hora Entrada</th>
        <th>Hora Salida</th>
        <th>Aula</th>
      </tr>
    </thead>
    <tbody>
      {historial.map((registro, index) => (
        <tr key={index}>
          <td>{new Date(registro.fecha).toLocaleDateString('es-MX')}</td>
          <td>{registro.hora_entrada || "-"}</td>
          <td>{registro.hora_salida || "-"}</td>
          <td>{registro.nombre_aula || "Sin aula"}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
  );
};

export default Historial;
