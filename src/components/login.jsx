import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();
    const irRegistro = () => 
      navigate("/RegistroAlumno");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        // http://192.168.1.11:8080/classaccess/api.php?endpoint=login
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, password: contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("Login exitoso");
      
      const tipoUsuario = data.user.priv_usu;
    

        localStorage.setItem("usuario", JSON.stringify(data.user));
        localStorage.setItem("id_usu", data.user.id_usu);


      if (tipoUsuario == 1){
        navigate("/alumno");
      }
      else if (tipoUsuario == 2){
        navigate("/maestro");
      }
      else if (tipoUsuario == 3){
        navigate("/admi");
      }
      else{
        setMensaje("Tipo de usuario desconocido")
      }

      } else {
        setMensaje(`${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error al intentar iniciar sesión");
    }

  

  };

  return (
   <div className="login-page">
  <div className="left-panel">
    <img src="/logo.png" alt="Logo" className="logo-image" />
  </div>
  <div className="right-panel">
    <div className="form-container">
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
        <button onClick={irRegistro} className="boton-registro">Registro</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  </div>
</div>

  );
};

export default Login;
