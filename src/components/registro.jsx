import React, { useState } from "react";
import "../styles/registroAlumno.css";
import { useNavigate } from "react-router-dom"


const RegistroAlumno = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    ap: "",
    am: "",
    correo: "",
    password: "",
    repetirPassword: "",
    matricula: "",
    cod_rfid: "",
    grupo: "",
    priv: "1",
  });


  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const irLogin = () =>
    navigate("/");

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "grupo") {
      value = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarPassword = (pwd) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]).{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const {
      nombre,
      ap,
      am,
      correo,
      password,
      repetirPassword,
      matricula,
      cod_rfid,
      grupo,
      priv,
    } = formData;

    if (password !== repetirPassword) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    if (!validarPassword(password)) {
      setMensaje("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un caracter especial.");
      return;
    }


    const payload = {
      nombre,
      ap,
      am,
      correo,
      password,
      priv,
      matricula,
      cod_rfid: cod_rfid || null,
      grupo,
    };

    try {
      const res = await fetch("https://servidor-class-access.vercel.app/registrarUsuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        if (!cod_rfid) {
          alert(
            "Registro exitoso. Recuerda que para añadir el acceso con credencial, puedes acercarte a un módulo y agregarlo más tarde desde tu perfil."
          );
        } else {
          alert("Registro exitoso.");
        }
        navigate("/");
      } else {
        setMensaje("Error al registrar usuario.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error de conexión al servidor.");
    }
  };

  return (
    <div className="registro-page">
      <div className="left-panel-registro">
        <img src="/logo.png" alt="Logo" className="logo-image-small" />
      </div>
      <div className="right-panel-registro">
        <div className="form-container-registro">
          <h2>Registro de Alumno</h2>
          <form onSubmit={handleSubmit}>
            {[
              { label: "Nombre", name: "nombre" },
              { label: "Apellido Paterno", name: "ap" },
              { label: "Apellido Materno", name: "am" },
              { label: "Correo", name: "correo", type: "email" },
              { label: "Contraseña", name: "password", type: "password" },
              { label: "Repetir Contraseña", name: "repetirPassword", type: "password" },
              { label: "Matrícula", name: "matricula" },
              { label: "Grupo", name: "grupo", placeholder: "Ej. G1" },
              { label: "Código RFID (opcional)", name: "cod_rfid" },
            ].map(({ label, name, type = "text", placeholder }) => (
              <div className="form-group" key={name}>
                <label>{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required={name !== "cod_rfid"}
                />
              </div>
            ))}

            <button type="submit">Registrar</button>
            <button onClick={irLogin} type="submit">Regresar</button>
          </form>
          {mensaje && <p className="mensaje">{mensaje}</p>}
        </div>
      </div>
    </div>
  );
};

export default RegistroAlumno;
