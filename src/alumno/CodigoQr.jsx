import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import "../styles/alumno.css";

const Codigo = () => {
  const [alumnos, setAlumnos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/api/alumnos")
      .then((res) => {
        setAlumnos(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener alumnos:", err);
      });
  }, []);

  const irPerfil = () => {
    navigate("/alumno/perfil");
  };

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/");
  };
  const irQr = ()=>{
  navigate("/CodigoQR")
}

  return (
    <div className="dashboard-alumno">
      <aside className="sidebar-alumno">
        <h2>Alumno</h2>
        <ul>
          <li onClick={() => navigate("/alumno")}>Inicio</li>
          <li onClick={irPerfil}>Perfil</li>
                    <li onClick={irQr}>Codigo Qr</li>

          <li>Clases</li>
          <li>Calendario escolar</li>
          <li>Historial</li>
          <li className="logout" onClick={cerrarSesion}>Cerrar sesión</li>
        </ul>
      </aside>

      <div style={{ padding: 20, width: "100%", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.8rem" }}>Códigos QR de Alumnos</h2>

        {alumnos.map((alumno) => (
          <div
            key={alumno.id_alumno}
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
              {alumno.nombre_usu} {alumno.ap_usu}
            </h3>
            <div style={{ width: "100%", maxWidth: "300px" }}>
              <QRCodeSVG
                value={String(alumno.matricula)}
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

export default Codigo;
