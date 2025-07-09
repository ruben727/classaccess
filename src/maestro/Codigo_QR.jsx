import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import "../styles/maestro.css";
import MenuMaestro from "./menuMaestro";

const Codigo_QR = () => {
  const [profesor, setProfesor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id_usu = localStorage.getItem("id_usu");
    if (!id_usu) {
      navigate("/"); // redirigir si no ha iniciado sesión
      return;
    }

    axios.get(`http://localhost:3001/api/profesor/${id_usu}`)
      .then((res) => {
        setProfesor(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener profesor:", err);
      });
  }, [navigate]);

  if (!profesor) return <p style={{ textAlign: "center" }}>Cargando QR...</p>;

  return (
    <div className="dashboard-alumno">
      <MenuMaestro />

      <div style={{ padding: 20, width: "100%", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.8rem" }}>Código QR</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            marginBottom: 40,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: "10px",
            backgroundColor: "#fff",
          }}
        >
          <h3 style={{ fontSize: "1.2rem", marginBottom: 10 }}>
            {profesor.nombre_usu} {profesor.ap_usu}
          </h3>
          <div style={{ width: "100%", maxWidth: "300px" }}>
            <QRCodeSVG
              value={String(profesor.no_empleado)}
              size={256}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Codigo_QR;