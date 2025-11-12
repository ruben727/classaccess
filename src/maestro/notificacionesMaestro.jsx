import React, { useEffect, useState } from "react";
import MenuMaestro from "./menuMaestro";
import "../styles/notificacionesAlumno.css";
import { useNavigate } from "react-router-dom";

const NotificacionesMaestro = () => {
  const navigate = useNavigate();

    useEffect(() => {
        const usuario = localStorage.getItem("usuario");
        if (!usuario) {
            navigate("/"); // Redirige al login si no hay sesión
        }
    }, [navigate]);

  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const id_usu = localStorage.getItem("id_usu");

    const fetchNotificaciones = async () => {
      try {
        const res = await fetch("https://servidor-class-access.vercel.app/notificacionesAlumno", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_usu }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("respuesta:", errorData);
          setCargando(false);
          return;
        }

        const data = await res.json();
        console.log("respuesta:", data);

        if (data.success) {
          setNotificaciones(Array.isArray(data.notificaciones) ? data.notificaciones : []);
        } else {
          setNotificaciones([]);
        }
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchNotificaciones();
  }, []);

  return (
    <div className="alumno-notificaciones-container">
      <MenuMaestro />
      <div className="alumno-noti-contenedor">
        <h2 className="alumno-noti-titulo">Mis notificaciones</h2>

        {cargando ? (
          <p className="alumno-noti-cargando">Cargando...</p>
        ) : notificaciones.length === 0 ? (
          <p className="alumno-noti-sin-datos">No tienes notificaciones.</p>
        ) : (
          <div className="alumno-noti-tabla-contenedor">
            <table className="alumno-noti-tabla">
              <thead>
                <tr>
                  <th className="alumno-noti-cabecera">Mensaje</th>
                  <th className="alumno-noti-cabecera">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {notificaciones.map((noti) => (
                  <tr key={noti.id_notificacion} className="alumno-noti-fila">
                    <td className="alumno-noti-mensaje" title={noti.mensaje}>{noti.mensaje}</td>
                    <td className="alumno-noti-fecha">{new Date(noti.fecha).toLocaleString("es-MX")}</td>
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

export default NotificacionesMaestro;