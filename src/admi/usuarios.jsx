import React, { useEffect, useState } from "react";
import "../styles/administrador.css";
import "../styles/usuarios.css";
import { useNavigate } from "react-router-dom";
import MenuAdmin from "./menuAdmi";
import RegistrarUsuario from "./registrarUsuario";

const Usuarios = () => {
  const [maestros, setMaestros] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [administradores, setAdministradores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/usuarios")
      .then(res => res.json())
      .then(data => {
        // Validar que data existe y tiene las propiedades
        setMaestros(Array.isArray(data.maestros) ? data.maestros : []);
        setAlumnos(Array.isArray(data.alumnos) ? data.alumnos : []);
        setAdministradores(Array.isArray(data.administradores) ? data.administradores : []);
      })
      .catch(err => {
        console.error("Error al obtener usuarios:", err);
        setMaestros([]);
        setAlumnos([]);
        setAdministradores([]);
      });
  }, []);

  const cambiarEstatus = (id, nuevoEstatus) => {
    fetch(`http://localhost:3001/usuarios/${id}/estatus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ estatus: nuevoEstatus })
    })
      .then(() => {
        // Actualiza en el estado local
        setMaestros(prev => prev.map(u => u.id_usu === id ? { ...u, estatus_usu: nuevoEstatus } : u));
        setAlumnos(prev => prev.map(u => u.id_usu === id ? { ...u, estatus_usu: nuevoEstatus } : u));
      });
  };

  return (
    <div className="dashboard-administrador">
    <MenuAdmin></MenuAdmin>
   
      <main className="contenido-administrador">
         <br /><br /><br /><br /><br />
        <h1 className="titulo-usuarios">Gestión de Usuarios</h1>
      <br /><br />
        <button onClick={() => navigate("/registro")} className="btn-agregar">Agregar Usuario</button>

        <section>
          <h2>Maestros</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th><th>Correo</th><th>Estatus</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {maestros.map(m => (
                <tr key={m.id_usu}>
                  <td>{m.nombre_usu} {m.ap_usu} {m.am_usu}</td>
                  <td>{m.correo_usu}</td>
                  <td>{m.estatus_usu === 0 ? "Inactivo" : "Activo"}</td>
                  <td>
                    <button onClick={() => cambiarEstatus(m.id_usu, m.estatus_usu === 1 ? 0 : 1)}>
                      {m.estatus_usu === 1 ?  "Dar de baja" : "Activar" }
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Alumnos</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th><th>Correo</th><th>Estatus</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map(a => (
                <tr key={a.id_usu}>
                  <td>{a.nombre_usu} {a.ap_usu} {a.am_usu}</td>
                  <td>{a.correo_usu}</td>
                  <td>{a.estatus_usu === 0 ? "Inactivo" : "Activo"}</td>
                  <td>
                    <button onClick={() => cambiarEstatus(a.id_usu, a.estatus_usu === 1 ? 0 : 1)}>
                      {a.estatus_usu === 1 ? "Dar de baja" : "Activar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Administradores</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th><th>Correo</th><th>Estatus</th>
              </tr>
            </thead>
            <tbody>
              {administradores.map(ad => (
                <tr key={ad.id_usu}>
                  <td>{ad.nombre_usu} {ad.ap_usu} {ad.am_usu}</td>
                  <td>{ad.correo_usu}</td>
                  <td>{ad.estatus_usu === 1 ? "Activo" : "Inactivo"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Usuarios;
