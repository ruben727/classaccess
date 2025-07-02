import React, { useState } from "react";
import MenuAdmin from "./menuAdmi";
import "../styles/notificaciones.css";

const EnviarNotificaciones = () => {
  const [mensaje, setMensaje] = useState("");
  const [destino, setDestino] = useState("1_2"); // Por defecto enviar a todos

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/enviarNotificacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mensaje,
        tipo_destino: destino === "1_2" ? "todos" : parseInt(destino)
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Notificación enviada");
          setMensaje("");
          setDestino("1_2");
        } else {
          alert(data.msg || "Error al enviar notificación");
        }
      });
  };

  return (
    <div className="dashboard-administrador">
      <MenuAdmin />

      <main className="contenido-administrador">
        <h1>Enviar Notificación</h1>
        <form className="form-notificacion" onSubmit={handleSubmit}>
          <textarea
            placeholder="Escribe el mensaje..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
          />

          <select value={destino} onChange={(e) => setDestino(e.target.value)} required>
            <option value="1">Solo Alumnos</option>
            <option value="2">Solo Maestros</option>
            <option value="1_2">Todos</option>
          </select>

          <button type="submit">Enviar</button>
        </form>
      </main>
    </div>
  );
};

export default EnviarNotificaciones;
