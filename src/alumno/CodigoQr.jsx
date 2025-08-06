import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import "../styles/alumno.css";
import "../styles/codigoAlumno.css";
import MenuAlumno from "./menuAlumno";

const Codigo = () => {
  const [alumno, setAlumno] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const id_usu = usuario?.id_usu;

    if (!id_usu) {
      setError("No se encontró sesión de usuario");
      setIsLoading(false);
      return navigate("/");
    }

    const fetchAlumno = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/alumno/${id_usu}`);
        setAlumno(response.data);
      } catch (err) {
        console.error("Error al obtener alumno:", err);
        setError("Error al cargar los datos del alumno");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlumno();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="alumno-container">
        <MenuAlumno />
        <div className="contenido-alumno">
          <div className="cargando-qr">
            <p>Cargando información del alumno...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alumno-container">
        <MenuAlumno />
        <div className="contenido-alumno">
          <div className="error-qr">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="alumno-container">
      <MenuAlumno />
      
      <main className="contenido-alumno">
        <h1 className="titulo-qr">Código QR de Identificación</h1>
        
        <div className="contenedor-qr">
          <div className="tarjeta-qr">
            <h2 className="nombre-alumno">
              {alumno.nombre_usu} {alumno.ap_usu}
            </h2>
            <p className="matricula">{alumno.matricula}</p>
            
            <div className="codigo-qr-container">
              <QRCodeSVG
                value={String(alumno.matricula)}
                size={256}
                className="codigo-qr"
                includeMargin={true}
                level="H" // Alto nivel de corrección de errores
              />
            </div>
            
            <p className="instrucciones">
              Muestra este código QR para registrar tu asistencia
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Codigo;