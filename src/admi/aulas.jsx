import React, { useEffect, useState } from "react";
import MenuAdmin from "./menuAdmi";
import "../styles/administrador.css";
import "../styles/usuarios.css";
import "../styles/aulas.css"
import { useNavigate } from "react-router-dom";

const Aulas = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if(!usuario) {
      navigate("/");
    }
  }, [navigate]);
  
  const [aulas, setAulas] = useState([]);
  const [dispositivos, setDispositivos] = useState([]);
  const [nombreAula, setNombreAula] = useState("");
  const [edificio, setEdificio] = useState("");
  const [idDispositivo, setIdDispositivo] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtenerDispositivos = () => {
    fetch("http://localhost:3001/api/dispositivos")
      .then(res => res.json())
      .then(data => {
        const activos = data.filter(d => d.estatus_dis === 1);
        setDispositivos(activos);
      });
  };

  const obtenerAulas = () => {
    fetch("http://localhost:3001/api/aulas")
      .then(res => res.json())
      .then(data => setAulas(data));
  };

  useEffect(() => {
    obtenerDispositivos();
    obtenerAulas();
  }, []);

  const limpiarFormulario = () => {
    setNombreAula("");
    setEdificio("");
    setIdDispositivo("");
    setEditandoId(null);
  };

  const validarDispositivo = () => {
    if (!idDispositivo) return true;
    const dispositivoEnUso = aulas.find(
      a => a.id_dispositivo === parseInt(idDispositivo) && a.id_aula !== editandoId
    );
    return !dispositivoEnUso;
  };

  const guardarAula = (e) => {
    e.preventDefault();

    if (!nombreAula.trim() || !edificio.trim()) {
      return alert("Completa todos los campos obligatorios");
    }

    if (!validarDispositivo()) {
      return alert("Este dispositivo ya se encuentra asignado a otra aula");
    }

    const datos = {
      nombre_aula: nombreAula,
      edificio,
      id_dispositivo: idDispositivo ? parseInt(idDispositivo) : null
    };

    const url = editandoId
      ? `http://localhost:3001/api/aulas/${editandoId}`
      : "http://localhost:3001/api/aulas";

    const metodo = editandoId ? "PUT" : "POST";

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          limpiarFormulario();
          obtenerAulas();
        } else {
          alert("Error al guardar aula");
        }
      });
  };

  const editarAula = (aula) => {
    setNombreAula(aula.nombre_aula);
    setEdificio(aula.edificio);
    setIdDispositivo(aula.id_dispositivo || "");
    setEditandoId(aula.id_aula);
  };

  return (
    <div className="dashboard-administrador">
      <MenuAdmin />
    
<main className="contenido-administrador aulas-container">
  <div className="aulas-header">
    <h1>Gestión de Aulas</h1>
  </div>

  <form className="form-aula" onSubmit={guardarAula}>
    <div className="form-grid">
      <div className="form-group">
        <label htmlFor="nombre-aula">Nombre del aula</label>
        <input
          id="nombre-aula"
          type="text"
          placeholder="Ej. Aula 101"
          value={nombreAula}
          onChange={(e) => setNombreAula(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="edificio">Edificio</label>
        <input
          id="edificio"
          type="text"
          placeholder="Ej. Edificio A"
          value={edificio}
          onChange={(e) => setEdificio(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="dispositivo">Dispositivo</label>
        <select
          id="dispositivo"
          value={idDispositivo}
          onChange={(e) => setIdDispositivo(e.target.value)}
        >
          <option value="">Sin dispositivo</option>
          {dispositivos.map(dis => (
            <option key={dis.id_dispositivo} value={dis.id_dispositivo}>
              {dis.nombre_dis} (ID: {dis.id_dispositivo})
            </option>
          ))}
        </select>
      </div>
    </div>
    
    <div className="form-actions">
      <button type="submit" className="btn-guardar">
        {editandoId ? "Actualizar Aula" : "Agregar Aula"}
      </button>
      {editandoId && (
        <button 
          type="button" 
          className="btn-cancelar"
          onClick={limpiarFormulario}
        >
          Cancelar
        </button>
      )}
    </div>
  </form>

  <div className="table-responsive">
    {aulas.length > 0 ? (
      <table className="aulas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edificio</th>
            <th>Dispositivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {aulas.map(a => (
            <tr key={a.id_aula}>
              <td data-label="ID">{a.id_aula}</td>
              <td data-label="Nombre">{a.nombre_aula}</td>
              <td data-label="Edificio">{a.edificio}</td>
              <td data-label="Dispositivo">
                {a.id_dispositivo ? (
                  <span className="dispositivo-asignado">
                    {dispositivos.find(d => d.id_dispositivo === a.id_dispositivo)?.nombre_dis}
                  </span>
                ) : (
                  <span className="sin-dispositivo">Sin dispositivo</span>
                )}
              </td>
              <td data-label="Acciones">
                <button 
                  onClick={() => editarAula(a)}
                  className="btn-editar"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="no-results">
        <p>No hay aulas registradas</p>
      </div>
    )}
  </div>
</main>
    </div>
  );
};

export default Aulas;
