import React, {useEffect, useState}from "react";
import "../styles/administrador.css"
import { useNavigate } from "react-router-dom";
import MenuAdmin from "./menuAdmi";


const Admi = () => {
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

    if (usuarioGuardado) {
      setNombre(usuarioGuardado.nombre_usu); 
    } else {
   
      window.location.href = "/";
    }
  }, []);

  const irUsuarios = () =>{
    navigate("/usuarios");
  }

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };



    return (
        <div className="dashboard-administrador">
   <MenuAdmin></MenuAdmin>
            <main className="contenido-administrador">
                <h1>Bienvenido, {nombre} </h1>
                <p>Selecciona una opción del menú para comenzar.</p>
            </main>
        </div>
    );
};

export default Admi;
