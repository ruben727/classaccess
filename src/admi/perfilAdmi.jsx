import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/perfilAdmi.css"; // Archivo CSS específico para el perfil
import MenuAdmin from "./menuAdmi";

const PerfilAdmin = () => {
  const [usuario, setUsuario] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correo: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
      setFormData({
        nombre: usuarioGuardado.nombre_usu,
        apellidoPaterno: usuarioGuardado.ap_usu,
        apellidoMaterno: usuarioGuardado.am_usu,
        correo: usuarioGuardado.correo_usu
      });
    } else {
      window.location.href = "/";
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los cambios
    console.log("Datos actualizados:", formData);
    setEditMode(false);
    // Actualizar el estado del usuario con los nuevos datos
    setUsuario(prev => ({
      ...prev,
      nombre_usu: formData.nombre,
      ap_usu: formData.apellidoPaterno,
      am_usu: formData.apellidoMaterno,
      correo_usu: formData.correo
    }));
  };

  if (!usuario) return <div className="loading">Cargando...</div>;

  return (
    <div className="dashboard-administrador">
      <MenuAdmin />
      <main className="contenido-administrador">
        <div className="perfil-header">
          <h1>Mi Perfil</h1>
          {!editMode && (
            <button 
              className="edit-button"
              onClick={() => setEditMode(true)}
            >
              Editar Perfil
            </button>
          )}
        </div>
        
        <div className="perfil-container">
          {editMode ? (
            <form className="perfil-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Apellido Paterno:</label>
                <input
                  type="text"
                  name="apellidoPaterno"
                  value={formData.apellidoPaterno}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Apellido Materno:</label>
                <input
                  type="text"
                  name="apellidoMaterno"
                  value={formData.apellidoMaterno}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label>Correo Electrónico:</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="save-button">
                  Guardar Cambios
                </button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setEditMode(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="perfil-info">
              <div className="info-item">
                <span className="info-label">Nombre completo:</span>
                <span className="info-value">
                  {usuario.nombre_usu} {usuario.ap_usu} {usuario.am_usu}
                </span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Correo electrónico:</span>
                <span className="info-value">{usuario.correo_usu}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Rol:</span>
                <span className="info-value">Administrador</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Estatus:</span>
                <span className="info-value">
                  {usuario.estatus_usu === 1 ? (
                    <span className="status-active">Activo</span>
                  ) : (
                    <span className="status-inactive">Inactivo</span>
                  )}
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PerfilAdmin;