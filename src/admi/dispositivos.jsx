import React, { useEffect, useState } from "react";
import MenuAdmin from "./menuAdmi";
import "../styles/administrador.css";
import "../styles/dispositivos.css";

const Dispositivos = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [nuevoDispositivo, setNuevoDispositivo] = useState("");

  const obtenerDispositivos = () => {
    fetch("http://localhost:3001/api/dispositivos")
      .then(res => res.json())
      .then(data => setDispositivos(data));
  };

  useEffect(() => {
    obtenerDispositivos();
  }, []);

  const agregarDispositivo = (e) => {
    e.preventDefault();
    if (nuevoDispositivo.trim() === "") return alert("Escribe un nombre válido");

    fetch("http://localhost:3001/api/dispositivos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre_dis: nuevoDispositivo })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNuevoDispositivo("");
          obtenerDispositivos();
        } else {
          alert("Error al agregar dispositivo");
        }
      });
  };

  const cambiarEstatus = (id, estatus) => {
    const confirmMsg = estatus === 0 ? "¿Seguro que quieres dar de baja este dispositivo?" : "¿Seguro que quieres activar este dispositivo?";
    if (!window.confirm(confirmMsg)) return;

    fetch(`http://localhost:3001/api/dispositivos/${id}/estatus`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estatus })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          obtenerDispositivos();
        } else {
          alert("Error al cambiar estatus");
        }
      });
  };

  return (
    <div className="dashboard-administrador">
      <MenuAdmin />
      <main className="contenido-administrador">
        <h1 className="titulo-dispositivos">Gestión de Dispositivos</h1>
        <br /><br />

        <form className="form-dispositivo" onSubmit={agregarDispositivo}>
          <input
            type="text"
            placeholder="Nombre del dispositivo"
            value={nuevoDispositivo}
            onChange={(e) => setNuevoDispositivo(e.target.value)}
            required
          />
          <button type="submit">Agregar</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Estatus</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {dispositivos.map(dis => (
              <tr key={dis.id_dispositivo}>
                <td>{dis.id_dispositivo}</td>
                <td>{dis.nombre_dis}</td>
                <td>{dis.estatus_dis === 1 ? "Activo" : "Inactivo"}</td>
                <td>
                  {dis.estatus_dis === 1 ? (
                    <button onClick={() => cambiarEstatus(dis.id_dispositivo, 0)}>Dar de baja</button>
                  ) : (
                    <button onClick={() => cambiarEstatus(dis.id_dispositivo, 1)}>Activar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Dispositivos;
