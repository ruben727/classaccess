import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import "../styles/alumno.css";
import MenuAlumno from "./menuAlumno";

const Codigo = () => {
  const [alumno, setAlumno] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id_usu = localStorage.getItem("id_usu");
    if (!id_usu) return navigate("/");

    axios
      .get(`http://localhost:3001/api/alumno/${id_usu}`)
      .then((res) => {
        setAlumno(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener alumno:", err);
      });
  }, [navigate]);

  if (!alumno)
    return <p style={{ textAlign: "center" }}>Cargando QR...</p>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <MenuAlumno />

      {/* Contenido principal */}
      <div style={{ flex: 1, padding: "40px", backgroundColor: "#f5f6f8" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.8rem" }}>Código QR</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            marginTop: 40,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: "10px",
            backgroundColor: "#fff",
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h3 style={{ fontSize: "1.2rem", marginBottom: 10 }}>
           <p>Nombre:  {alumno.nombre_usu} {alumno.ap_usu} </p>
          </h3>
          <p>Matrícula: {alumno.matricula}</p>
          <div style={{ width: "100%", maxWidth: "300px" }}>
            <QRCodeSVG
              value={String(alumno.matricula)}
              size={256}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Codigo;
