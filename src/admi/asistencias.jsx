import React, { useEffect, useState } from "react";
import MenuAdmin from "./menuAdmi";
import "../styles/administrador.css";
import "../styles/usuarios.css";
import "../styles/asistencia.css";

const Asistencias = () => {
  const [asistencias, setAsistencias] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroGrupo, setFiltroGrupo] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroEmpleado, setFiltroEmpleado] = useState("");
  const [filtrosAplicados, setFiltrosAplicados] = useState({
    nombre: "",
    grupo: "",
    categoria: "",
    empleado: "",
  });

  const obtenerAsistencias = () => {
    fetch("http://localhost:3001/api/asistencias")
      .then((res) => res.json())
      .then((data) => setAsistencias(data));
  };

  useEffect(() => {
    obtenerAsistencias();
  }, []);

  const asistenciasFiltradas = asistencias.filter((a) => {
    const nombreCompleto = `${a.nombre_usu} ${a.ap_usu} ${a.am_usu}`.toLowerCase();
    const categoriaValida =
      !filtrosAplicados.categoria ||
      (filtrosAplicados.categoria === "alumno" && a.priv_usu === 1) ||
      (filtrosAplicados.categoria === "maestro" && a.priv_usu === 2);

    return (
      nombreCompleto.includes(filtrosAplicados.nombre.toLowerCase()) &&
      (a.grupo?.toLowerCase().includes(filtrosAplicados.grupo.toLowerCase()) ||
        a.no_empleado?.includes(filtrosAplicados.empleado)) &&
      categoriaValida
    );
  });

  const aplicarFiltros = (e) => {
    e.preventDefault();
    setFiltrosAplicados({
      nombre: filtroNombre,
      grupo: filtroGrupo,
      categoria: filtroCategoria,
      empleado: filtroEmpleado,
    });
  };

  const limpiarFiltros = () => {
    setFiltroNombre("");
    setFiltroGrupo("");
    setFiltroCategoria("");
    setFiltroEmpleado("");
    setFiltrosAplicados({
      nombre: "",
      grupo: "",
      categoria: "",
      empleado: "",
    });
  };

  return (
    <div className="dashboard-administrador">
      <MenuAdmin />
      <main className="contenido-administrador">
        <h1 className="titulo-dispositivos">Historial de Asistencias</h1>

        <form className="filtros" onSubmit={aplicarFiltros}>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Buscar por grupo"
            value={filtroGrupo}
            onChange={(e) => setFiltroGrupo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Buscar por número de empleado"
            value={filtroEmpleado}
            onChange={(e) => setFiltroEmpleado(e.target.value)}
          />
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="alumno">Alumno</option>
            <option value="maestro">Maestro</option>
          </select>
          <button type="submit" className="btn-filtrar">
            Filtrar
          </button>
          <button type="button" onClick={limpiarFiltros} className="btn-limpiar">
            Limpiar
          </button>
        </form>

        {asistenciasFiltradas.length > 0 && filtrosAplicados.categoria === "maestro" && (
          <>
            <h2>Asistencias de Maestros</h2>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Empleado</th>
                  <th>Fecha</th>
                  <th>Edificio</th>
                  <th>Aula</th>
                  <th>Entrada</th>
                  <th>Salida</th>
                </tr>
              </thead>
              <tbody>
                {asistenciasFiltradas
                  .filter((a) => a.priv_usu === 2)
                  .map((a) => (
                    <tr key={a.id_registro}>
                      <td>{`${a.nombre_usu} ${a.ap_usu} ${a.am_usu}`}</td>
                      <td>{a.no_empleado}</td>
                      <td>{new Date(a.fecha).toLocaleDateString("es-MX")}</td>
                      <td>{a.edificio}</td>
                      <td>{a.nombre_aula}</td>
                      <td>{a.hora_entrada}</td>
                      <td>{a.hora_salida || "Sin salida"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}

        {asistenciasFiltradas.length > 0 && filtrosAplicados.categoria === "alumno" && (
          <>
            <h2>Asistencias de Alumnos</h2>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Matricula</th>
                  <th>Grupo</th>
                  <th>Fecha</th>
                  <th>Edificio</th>
                  <th>Aula</th>
                  <th>Entrada</th>
                  <th>Salida</th>
                </tr>
              </thead>
              <tbody>
                {asistenciasFiltradas
                  .filter((a) => a.priv_usu === 1)
                  .map((a) => (
                    <tr key={a.id_registro}>
                      <td>{`${a.nombre_usu} ${a.ap_usu} ${a.am_usu}`}</td>
                      <td>{a.matricula}</td>
                      <td>{a.grupo}</td>
                      <td>{new Date(a.fecha).toLocaleDateString("es-MX")}</td>
                      <td>{a.edificio}</td>
                      <td>{a.nombre_aula}</td>
                      <td>{a.hora_entrada}</td>
                      <td>{a.hora_salida || "Sin salida"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
};

export default Asistencias;
