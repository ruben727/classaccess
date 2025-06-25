import React, { useEffect, useState } from "react";
import MenuAdmin from "./menuAdmi";
import "../styles/administrador.css";
import "../styles/usuarios.css";

const Aulas = () => {
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
      <main className="contenido-administrador">
        <h1 className="titulo-dispositivos">Gestión de Aulas</h1>
        <br />

        <form className="form-dispositivo" onSubmit={guardarAula}>
          <input
            type="text"
            placeholder="Nombre del aula"
            value={nombreAula}
            onChange={(e) => setNombreAula(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Edificio"
            value={edificio}
            onChange={(e) => setEdificio(e.target.value)}
            required
          />
          <select
            value={idDispositivo}
            onChange={(e) => setIdDispositivo(e.target.value)}
          >
            <option value="">Sin dispositivo</option>
            {dispositivos.map(dis => (
              <option key={dis.id_dispositivo} value={dis.id_dispositivo}>
                {dis.nombre_dis}
              </option>
            ))}
          </select>
          <button type="submit">{editandoId ? "Actualizar Aula" : "Agregar Aula"}</button>
          {editandoId && (
            <button type="button" onClick={limpiarFormulario} style={{ marginLeft: "10px" }}>
              Cancelar
            </button>
          )}
        </form>

        <section>
          <h2>Aulas Registradas</h2>
          <table>
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
                  <td>{a.id_aula}</td>
                  <td>{a.nombre_aula}</td>
                  <td>{a.edificio}</td>
                  <td>
                    {dispositivos.find(d => d.id_dispositivo === a.id_dispositivo)?.nombre_dis || "Sin dispositivo"}
                  </td>
                  <td>
                    <button onClick={() => editarAula(a)}>Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Aulas;
