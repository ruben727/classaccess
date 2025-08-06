import React, { useEffect, useState } from "react";
import "../styles/usuarios.css";
import { useNavigate } from "react-router-dom";
import MenuAdmin from "./menuAdmi";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:3001/usuarios");
        const data = await response.json();
        
        const combinados = [
          ...data.alumnos.map(u => ({ ...u, tipo: "alumno" })),
          ...data.maestros.map(u => ({ ...u, tipo: "maestro" })),
          ...data.administradores.map(u => ({ ...u, tipo: "administrador" }))
        ];
        
        setUsuarios(combinados);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
        setError("Error al cargar los usuarios");
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const cambiarEstatus = async (id, nuevoEstatus) => {
    try {
      await fetch(`http://localhost:3001/usuarios/${id}/estatus`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ estatus: nuevoEstatus })
      });
      
      setUsuarios(prev =>
        prev.map(u => u.id_usu === id ? { ...u, estatus_usu: nuevoEstatus } : u)
      );
    } catch (err) {
      console.error("Error al cambiar estatus:", err);
      alert("No se pudo actualizar el estatus del usuario");
    }
  };

  const usuariosFiltrados = usuarios.filter(u => {
    const nombreCompleto = `${u.nombre_usu} ${u.ap_usu} ${u.am_usu}`.toLowerCase();
    const coincideBusqueda = nombreCompleto.includes(busqueda.toLowerCase()) || 
                           u.correo_usu.toLowerCase().includes(busqueda.toLowerCase());
    const coincideTipo = tipoFiltro === "todos" || u.tipo === tipoFiltro;
    return coincideBusqueda && coincideTipo;
  });

  if (loading) return <div className="loading">Cargando usuarios...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-administrador">
      <MenuAdmin />

      <main className="contenido-administrador usuarios-container">
        <div className="usuarios-header">
          <h1>Gestión de Usuarios</h1>
          <button 
            onClick={() => navigate("/registro")} 
            className="btn-agregar"
          >
            <i className="icon-plus"></i> Agregar Usuario
          </button>
        </div>

        <div className="filtros-container">
          <form className="filtros" onSubmit={e => e.preventDefault()}>
            <div className="filtro-group">
              <label htmlFor="tipo-filtro">Filtrar por tipo:</label>
              <select 
                id="tipo-filtro"
                value={tipoFiltro} 
                onChange={(e) => setTipoFiltro(e.target.value)}
                className="select-filtro"
              >
                <option value="todos">Todos los usuarios</option>
                <option value="alumno">Alumnos</option>
                <option value="maestro">Maestros</option>
                <option value="administrador">Administradores</option>
              </select>
            </div>
            
            <div className="filtro-group">
              <label htmlFor="busqueda">Buscar:</label>
              <input
                id="busqueda"
                type="text"
                placeholder="Nombre o correo electrónico"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="input-busqueda"
              />
            </div>
          </form>
        </div>

        <div className="table-responsive">
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Tipo</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map(u => (
                  <tr key={u.id_usu}>
                    <td data-label="Nombre">{u.nombre_usu} {u.ap_usu} {u.am_usu}</td>
                    <td data-label="Correo">{u.correo_usu}</td>
                    <td data-label="Tipo">
                      <span className={`badge ${u.tipo}`}>
                        {u.tipo.charAt(0).toUpperCase() + u.tipo.slice(1)}
                      </span>
                    </td>
                    <td data-label="Estatus">
                      <span className={`estatus ${u.estatus_usu === 1 ? 'activo' : 'inactivo'}`}>
                        {u.estatus_usu === 1 ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td data-label="Acciones">
                      {u.tipo !== "administrador" && (
                        <button 
                          onClick={() => cambiarEstatus(u.id_usu, u.estatus_usu === 1 ? 0 : 1)}
                          className={`btn-estatus ${u.estatus_usu === 1 ? 'desactivar' : 'activar'}`}
                        >
                          {u.estatus_usu === 1 ? "Desactivar" : "Activar"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-results">
                    No se encontraron usuarios con los filtros aplicados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Usuarios;