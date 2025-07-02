import React, { useEffect, useState } from "react";
import '../styles/maestro.css';
import '../styles/calendario.css';
import { useNavigate } from "react-router-dom";
import MenuMaestro from "./menuMaestro";

const CalendarioMaestro = () =>{
    return (
        <div className="dashboard-maestro">
            <MenuMaestro />
            <div className="position-image">
                <br></br>
                <h1>Calendario Escolar</h1>
                <img className="calendario1-image" src="/calendarioEscolar1.JPG" alt="Desde public" />
            </div>
        </div>
    );
};

export default CalendarioMaestro;