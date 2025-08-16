import React, { useEffect, useState } from "react";
import MenuAdmin from "./menuAdmi";
import "../styles/dispositivos.css";
import { useNavigate } from "react-router-dom";

const Dispositivos = () => {
  const navigate = useNavigate();

  useEffect(() => {
            const usuario = localStorage.getItem("usuario");
            if(!usuario) {
              navigate("/");
            }
  }, [navigate]);

  const [dispositivos, setDispositivos] = useState([]);
  const [nuevoDispositivo, setNuevoDispositivo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const obtenerDispositivos = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/dispositivos");
      const data = await response.json();
      setDispositivos(data);
      setLoading(false);
    } catch (err) {
      console.error("Error al obtener dispositivos:", err);
      setError("Error al cargar los dispositivos");
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerDispositivos();
  }, []);

  const agregarDispositivo = async (e) => {
    e.preventDefault();
    if (nuevoDispositivo.trim() === "") {
      alert("Por favor ingresa un nombre válido para el dispositivo");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/dispositivos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre_dis: nuevoDispositivo })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setNuevoDispositivo("");
        await obtenerDispositivos();
      } else {
        alert(data.message || "Error al agregar dispositivo");
      }
    } catch (err) {
      console.error("Error al agregar dispositivo:", err);
      alert("Error al conectar con el servidor");
    }
  };

  const cambiarEstatus = async (id, estatus) => {
    const confirmMsg = estatus === 0 
      ? "¿Seguro que quieres desactivar este dispositivo?" 
      : "¿Seguro que quieres activar este dispositivo?";
    
    if (!window.confirm(confirmMsg)) return;

    try {
      const response = await fetch(`http://localhost:3001/api/dispositivos/${id}/estatus`, {
        
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estatus })
      });
      
      const data = await response.json();
      
      if (data.success) {
        await obtenerDispositivos();
      } else {
        alert(data.message || "Error al cambiar el estatus");
      }
    } catch (err) {
      console.error("Error al cambiar estatus:", err);
      alert("Error al conectar con el servidor");
    }
  };

  if (loading) return <div className="loading">Cargando dispositivos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-administrador">
      <MenuAdmin />
      <main className="contenido-administrador dispositivos-container">
        <div className="dispositivos-header">
          <h1>Gestión de Dispositivos</h1>
        </div>

        <form className="form-dispositivo" onSubmit={agregarDispositivo}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Nombre del dispositivo"
              value={nuevoDispositivo}
              onChange={(e) => setNuevoDispositivo(e.target.value)}
              required
              className="input-nuevo-dispositivo"
            />
            <button type="submit" className="btn-agregar">
              <i className="icon-plus"></i> Agregar
            </button>
          </div>
        </form>

        <div className="table-responsive">
          {dispositivos.length > 0 ? (
            <table className="dispositivos-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Estatus</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {dispositivos.map(dis => (
                  <tr key={dis.id_dispositivo}>
                    <td data-label="ID">{dis.id_dispositivo}</td>
                    <td data-label="Nombre">{dis.nombre_dis}</td>
                    <td data-label="Estatus">
                      <span className={`estatus ${dis.estatus_dis === 1 ? 'activo' : 'inactivo'}`}>
                        {dis.estatus_dis === 1 ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td data-label="Acciones">
                      <button 
                        onClick={() => cambiarEstatus(dis.id_dispositivo, dis.estatus_dis === 1 ? 0 : 1)}
                        className={`btn-estatus ${dis.estatus_dis === 1 ? 'desactivar' : 'activar'}`}
                      >
                        {dis.estatus_dis === 1 ? "Desactivar" : "Activar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-results">
              <p>No hay dispositivos registrados</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dispositivos;