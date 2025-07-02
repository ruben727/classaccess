import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import "../styles/maestro.css";
import MenuMaestro from "./menuMaestro";

const Codigo_QR = () => {
  const [profesores, setProfesores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/api/prof")
      .then((res) => {
        setProfesores(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener profesores:", err);
      });
  }, []);


  return (
    <div className="dashboard-maestro">
       <MenuMaestro></MenuMaestro>

      <div style={{ padding: 20, width: "100%", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.8rem" }}>Código QR</h2>

        {profesores.map((prof) => (
          <div
            key={prof.id_prof}
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
              {prof.nombre_usu} {prof.ap_usu}
            </h3>
            <div style={{ width: "100%", maxWidth: "300px" }}>
              <QRCodeSVG
                value={String(prof.no_empleado)}
                size={256}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Codigo_QR;