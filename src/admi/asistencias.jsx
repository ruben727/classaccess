import React, { useEffect, useState } from "react";
import MenuAdmin from "./menuAdmi";
import "../styles/asistencia.css";

const Asistencias = () => {
  const [asistencias, setAsistencias] = useState([]);
  const [fecha, setFecha] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const obtenerAsistencias = async () => {
    try {
      setLoading(true);
      const url = new URL("http://localhost:3001/api/asistencias");
      if (fecha) url.searchParams.append("fecha", fecha);
      if (busqueda) url.searchParams.append("busqueda", busqueda);

      const response = await fetch(url);
      const data = await response.json();
      setAsistencias(data);
      setLoading(false);
    } catch (err) {
      console.error("Error al obtener asistencias:", err);
      setError("Error al cargar las asistencias");
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerAsistencias();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    obtenerAsistencias();
  };

  const limpiarFiltros = () => {
    setFecha("");
    setBusqueda("");
    obtenerAsistencias();
  };

  if (loading) return <div className="loading">Cargando asistencias...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-administrador">
      <MenuAdmin />
      <main className="contenido-administrador asistencia-container">
        <div className="asistencia-header">
          <h1>Historial de Asistencias</h1>
        </div>

        <div className="filtros-container">
          <form className="filtros-form" onSubmit={handleSubmit}>
            <div className="filtro-group">
              <label htmlFor="fecha">Filtrar por fecha:</label>
              <input
                id="fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="input-filtro"
              />
            </div>
            
            <div className="filtro-group">
              <label htmlFor="busqueda">Buscar:</label>
              <input
                id="busqueda"
                type="text"
                placeholder="Matrícula o No. Empleado"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="input-filtro"
              />
            </div>
            
            <div className="filtro-actions">
              <button type="submit" className="btn-filtrar">
                <i className="icon-search"></i> Buscar
              </button>
              <button 
                type="button" 
                className="btn-limpiar"
                onClick={limpiarFiltros}
              >
                <i className="icon-clear"></i> Limpiar
              </button>
            </div>
          </form>
        </div>

        <div className="table-responsive">
          {asistencias.length > 0 ? (
            <table className="asistencias-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Edificio</th>
                  <th>Aula</th>
                  <th>Grupo</th>
                  <th>Entrada</th>
                  <th>Salida</th>
                </tr>
              </thead>
              <tbody>
                {asistencias.map((a) => (
                  <tr key={a.id_registro}>
                    <td data-label="Nombre">{`${a.nombre_usu} ${a.ap_usu} ${a.am_usu}`}</td>
                    <td data-label="Correo">{a.correo_usu}</td>
                    <td data-label="Edificio">{a.edificio}</td>
                    <td data-label="Aula">{a.nombre_aula}</td>
                    <td data-label="Grupo">
                      {a.priv_usu === 1 ? (
                        <span className="badge grupo">{a.grupo}</span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td data-label="Entrada">
                      <span className="hora entrada">{a.hora_entrada}</span>
                    </td>
                    <td data-label="Salida">
                      {a.hora_salida ? (
                        <span className="hora salida">{a.hora_salida}</span>
                      ) : (
                        <span className="sin-salida">Sin salida</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-results">
              <p>No se encontraron asistencias con los filtros aplicados</p>
              <button 
                className="btn-limpiar"
                onClick={limpiarFiltros}
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Asistencias;