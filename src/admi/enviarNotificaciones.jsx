import React, { useState, useEffect } from "react";
import MenuAdmin from "./menuAdmi";
import "../styles/notificaciones.css";
import { useNavigate } from "react-router-dom";

const EnviarNotificaciones = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if(!usuario) {
      navigate("/");
    }
  }, [navigate]);
  
  const [mensaje, setMensaje] = useState("");
  const [destino, setDestino] = useState("1_2");
  const [enviado, setEnviado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:3001/enviarNotificacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mensaje,
          tipo_destino: destino === "1_2" ? "todos" : parseInt(destino)
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setEnviado(true);
        setMensaje("");
        setDestino("1_2");
        setTimeout(() => setEnviado(false), 3000);
      } else {
        alert(data.msg || "Error al enviar notificación");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-administrador">
      <MenuAdmin />

      <main className="contenido-administrador notificaciones-container">
        <div className="notificaciones-header">
          <h1>Enviar Notificación</h1>
          <p>Envía mensajes importantes a los usuarios del sistema</p>
        </div>

        <form className="form-notificacion" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea
              id="mensaje"
              placeholder="Escribe el mensaje que deseas enviar..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="destino">Destinatarios:</label>
            <select 
              id="destino"
              value={destino} 
              onChange={(e) => setDestino(e.target.value)} 
              required
            >
              <option value="1">Solo Alumnos</option>
              <option value="2">Solo Maestros</option>
              <option value="1_2">Todos los usuarios</option>
            </select>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-enviar"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Enviando...
                </>
              ) : (
                <>
                  <i className="icon-send"></i>
                  Enviar Notificación
                </>
              )}
            </button>
          </div>
        </form>

        {enviado && (
          <div className="notification-success">
            ¡Notificación enviada correctamente!
          </div>
        )}
      </main>
    </div>
  );
};

export default EnviarNotificaciones;