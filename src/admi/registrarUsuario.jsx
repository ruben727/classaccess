import React, { useState } from "react";
import "../styles/registro.css";
import MenuAdmin from "./menuAdmi";

const RegistrarUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    ap: "",
    am: "",
    correo: "",
    password: "",
    priv: "1",
    matricula: "",
    cod_rfid: "",
    no_empleado: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/registrarUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Usuario registrado con éxito");
        } else {
          alert("Error al registrar usuario");
        }
      });
  };

  return (
    <div className="dashboard-administrador">
      <MenuAdmin />

      <main className="contenido-administrador">
  
        <h1>Registrar Usuario</h1>
        <br /><br />
        <form className="form-registro" onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
          <input type="text" name="ap" placeholder="Apellido Paterno" onChange={handleChange} required />
          <input type="text" name="am" placeholder="Apellido Materno" onChange={handleChange} required />
          <input type="email" name="correo" placeholder="Correo" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />

          <select name="priv" onChange={handleChange} value={formData.priv}>
            <option value="1">Alumno</option>
            <option value="2">Maestro</option>
            <option value="3">Administrador</option>
          </select>

          {formData.priv === "1" && (
            <>
              <input type="text" name="matricula" placeholder="Matrícula" onChange={handleChange} required />
              <input type="text" name="cod_rfid" placeholder="Código RFID" onChange={handleChange} required />
            </>
          )}

          {formData.priv === "2" && (
            <input type="text" name="no_empleado" placeholder="Número de Empleado" onChange={handleChange} required />
          )}

          <button type="submit">Registrar</button>
        </form>
      </main>
    </div>
  );
};

export default RegistrarUsuario;
