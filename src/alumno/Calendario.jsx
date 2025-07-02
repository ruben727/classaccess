import React from "react";
import MenuAlumno from "./menuAlumno";
import "../styles/alumno.css";

const Calendario = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <MenuAlumno />

      {/* Contenido */}
      <div style={{ flex: 1, padding: "30px", backgroundColor: "#f5f6f8" }}>
        <h2 style={{ marginBottom: "20px", color: "black" }}>
          Calendario Escolar
        </h2>

        {/* Tarjeta 1 */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            padding: "20px",
            marginBottom: "30px",
          }}
        >
        
          <img
            src="./calendarioEscolar1.JPG"
            alt="Calendario 2023-2024"
            style={{ width: "80%", maxWidth: "400px", display: "block", margin: "0 auto" }}
          />
        </div>

        
          
        </div>
      </div>
  );
};

export default Calendario;
