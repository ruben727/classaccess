import React, { useEffect, useState } from "react";
import '../styles/maestro.css'
import { useNavigate } from "react-router-dom";
import MenuMaestro from "./menuMaestro";

const PerfilMaestro = () => {
    return (
        <div className="dashboard-maestro">
            <MenuMaestro />
        </div>
    );
};

export default PerfilMaestro;
