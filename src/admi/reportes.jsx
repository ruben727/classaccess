import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import MenuAdmin from "./menuAdmi";
import "../styles/administrador.css";
import "../styles/usuarios.css";
import "../styles/reportes.css";

const Reportes = () => {
  const [asistencias, setAsistencias] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroGrupo, setFiltroGrupo] = useState("");
  const [totalClases, setTotalClases] = useState(0);
  const [inicioCuatri, setInicioCuatri] = useState("");
  const [finCuatri, setFinCuatri] = useState("");
  const [clasesEfectivas, setClasesEfectivas] = useState(0);

  useEffect(() => {
    obtenerGrupos();
    obtenerAsistencias();
  }, [filtroFecha, filtroGrupo]);

  const obtenerAsistencias = () => {
    const params = new URLSearchParams();
    if (filtroFecha) params.append("fecha", filtroFecha);
    if (filtroGrupo) params.append("grupo", filtroGrupo);

    fetch(`http://localhost:3001/api/asistencias/reportes?${params.toString()}`)
      .then(res => res.json())
      .then(data => setAsistencias(data));
  };

  const obtenerGrupos = () => {
    fetch("http://localhost:3001/api/grupos")
      .then(res => res.json())
      .then(data => setGrupos(data));
  };

  const asistenciasFiltradas = asistencias.filter(() => true); // Ya vienen filtradas

  const datosMaestros = contarAsistencias(asistenciasFiltradas.filter(a => a.priv_usu === 2));
  const datosAlumnos = contarAsistencias(asistenciasFiltradas.filter(a => a.priv_usu === 1));

  function contarAsistencias(arr) {
    const conteo = {};
    arr.forEach(a => {
      const clave = `${a.nombre_aula} - ${a.edificio}`;
      conteo[clave] = (conteo[clave] || 0) + 1;
    });
    return Object.keys(conteo).map(key => ({ aula: key, asistencias: conteo[key] }));
  }

  const descargarLista = () => {
    if (!filtroFecha || !filtroGrupo) {
      return alert("Debes seleccionar una fecha y un grupo para descargar la lista.");
    }

    const alumnos = asistenciasFiltradas.filter(a => a.priv_usu === 1);
    const maestro = asistenciasFiltradas.find(a => a.priv_usu === 2);

    if (!alumnos.length && !maestro) {
      return alert("No hay registros de asistencia para ese filtro.");
    }

    const ventana = window.open("", "_blank");
    ventana.document.write("<h1>Lista de Asistencia</h1>");
    ventana.document.write(`<p>Fecha: ${filtroFecha}</p>`);
    ventana.document.write(`<p>Grupo: ${filtroGrupo}</p>`);

    if (maestro) {
      ventana.document.write("<h3>Maestro:</h3>");
      ventana.document.write(`<p>${maestro.nombre_usu} ${maestro.ap_usu} ${maestro.am_usu} - ${maestro.no_empleado}</p>`);
    }

    ventana.document.write("<h3>Alumnos:</h3>");
    ventana.document.write("<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Nombre</th><th>Matrícula</th><th>Aula</th><th>Entrada</th></tr></thead><tbody>");
    alumnos.forEach(a => {
      ventana.document.write(`<tr>
        <td>${a.nombre_usu} ${a.ap_usu} ${a.am_usu}</td>
        <td>${a.matricula}</td>
        <td>${a.nombre_aula}</td>
        <td>${a.hora_entrada}</td>
      </tr>`);
    });
    ventana.document.write("</tbody></table>");
    ventana.print();
    ventana.close();
  };

  const calcularClasesEfectivas = () => {
    if (!totalClases || !inicioCuatri || !finCuatri || !filtroGrupo) {
      return alert("Completa todos los campos para calcular.");
    }

    fetch(`http://localhost:3001/api/asistencias/reportes?grupo=${filtroGrupo}&fechaInicio=${inicioCuatri}&fechaFin=${finCuatri}`)
      .then(res => res.json())
      .then(data => {
        const fechasUnicas = new Set(data.map(a => a.fecha));
        setClasesEfectivas(fechasUnicas.size);
      });
  };

  const porcentaje = totalClases > 0 ? Math.round((clasesEfectivas / totalClases) * 100) : 0;

  return (
    <div className="dashboard-administrador">
      <MenuAdmin />
      <main className="contenido-administrador">
        <br /><br /><br /><br /><br /><br /><br /><br /> <br /><br /><br /><br />
        <h1 className="titulo-dispositivos">Reportes de Asistencias</h1>

        <div className="filtros">
          <input
            type="date"
            value={filtroFecha}
            onChange={e => setFiltroFecha(e.target.value)}
          />
          <input
            list="listaGrupos"
            placeholder="Filtrar por grupo (solo alumnos)"
            value={filtroGrupo}
            onChange={e => setFiltroGrupo(e.target.value)}
          />
          <datalist id="listaGrupos">
            {grupos.map((g, index) => (
              <option key={index} value={g} />
            ))}
          </datalist>
          <button onClick={descargarLista} className="btn-imprimir">Descargar lista de asistencia</button>
        </div>

        <div className="contenedor-reportes">
          <div className="reporte-seccion">
            <h2>Asistencias Maestros</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={datosMaestros}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="aula" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="asistencias" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="reporte-seccion">
            <h2>Asistencias Alumnos</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={datosAlumnos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="aula" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="asistencias" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <hr />
        <h2>Control de Clases del Cuatrimestre</h2>
        <div className="filtros">
          <input
            type="number"
            placeholder="Total de clases programadas"
            value={totalClases}
            onChange={e => setTotalClases(e.target.value)}
          />
          <input
            type="date"
            value={inicioCuatri}
            onChange={e => setInicioCuatri(e.target.value)}
            placeholder="Fecha de inicio"
          />
          <input
            type="date"
            value={finCuatri}
            onChange={e => setFinCuatri(e.target.value)}
            placeholder="Fecha de cierre"
          />
          <input
            list="listaGrupos"
            placeholder="Grupo"
            value={filtroGrupo}
            onChange={e => setFiltroGrupo(e.target.value)}
          />
          <button onClick={calcularClasesEfectivas} className="btn-imprimir">Calcular</button>
        </div>

        {totalClases > 0 && (
          <div className="grafica-cuatri">
            <h3>Porcentaje de clases efectivas: {porcentaje}%</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[{ nombre: filtroGrupo || "Grupo", porcentaje }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="porcentaje" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </main>
    </div>
  );
};

export default Reportes;
