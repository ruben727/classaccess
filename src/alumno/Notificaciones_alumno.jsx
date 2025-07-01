import React, { useEffect, useState } from "react";
import MenuAlumno from "./menuAlumno";
import "../styles/notificacioness.css";

const NotificacionesAlumno = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const id_usu = localStorage.getItem("id_usu");

    const fetchNotificaciones = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/alumno/notificaciones/${id_usu}`);

        if (!res.ok) {
          const errorData = await res.json();
          console.error("respuesta:", errorData);
          setCargando(false);
          return;
        }

        const data = await res.json();
        console.log("respuesta:", data);
        setNotificaciones(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchNotificaciones();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <MenuAlumno />
      <div className="noti-contenedor">
        <h2>Mis notificaciones</h2>

        {cargando ? (
          <p>Cargando...</p>
        ) : notificaciones.length === 0 ? (
          <p>No tienes notificaciones.</p>
        ) : (
          <div className="noti-tabla-contenedor">
            <table className="noti-tabla">
              <thead>
                <tr>
                  <th>Mensaje</th>
                  <th>Enviado por</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {notificaciones.map((noti, index) => (
                  <tr key={index}>
                    <td title={noti.mensaje}>{noti.mensaje}</td>
                    <td>{noti.nombre_usu} {noti.ap_usu} ({rolTexto(noti.priv_usu)})</td>
                    <td>{new Date(noti.fecha).toLocaleString("es-MX")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const rolTexto = (priv) => {
  if (priv === 1) return "Alumno";
  if (priv === 2) return "Maestro";
  if (priv === 3) return "Administrador";
  return "Desconocido";
};

export default NotificacionesAlumno;
