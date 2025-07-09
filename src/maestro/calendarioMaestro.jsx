import React, { useEffect, useState } from "react";
import '../styles/maestro.css';
import '../styles/calendario.css';
import { useNavigate } from "react-router-dom";
import MenuMaestro from "./menuMaestro";

const CalendarioMaestro = () =>{
    return (
<<<<<<< HEAD
<div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <MenuMaestro />

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
=======
        <div className="dashboard-maestro">
            <MenuMaestro />
            <div className="position-image">
                <br></br>
                <h1>Calendario Escolar</h1>
                <img className="calendario1-image" src="/calendarioEscolar1.JPG" alt="Desde public" />
            </div>
>>>>>>> de48a304d149cd58a14155a66f21a4928ad9abb5
        </div>

        
          
        </div>
      </div>
    );
};

export default CalendarioMaestro;