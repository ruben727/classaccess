import React from "react";
import Login from "./components/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Admin
import Admi from "./admi/dashboardAdmi";
import Usuarios from "./admi/usuarios";
import RegistrarUsuario from "./admi/registrarUsuario";
import PerfilAdmin from "./admi/perfilAdmi";
import Asistencias from "./admi/asistencias";
import EnviarNotificaciones from "./admi/enviarNotificaciones";

// Maestro
import Maestro from "./maestro/dashboardMaestros";
import PerfilMaestro from "./maestro/perfilMaestro";
import CalendarioMaestro from "./maestro/calendarioMaestro";
import Codigo_QR from "./maestro/Codigo_QR";


// Alumno
import Alumno from "./alumno/dashboardAlumno";
import PerfilAlumno from "./alumno/perfilAlumno";
import Historial from "./alumno/historialAlumno";
import CodigoQr from "./alumno/CodigoQr";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/alumno" element={<Alumno />} />
        <Route path="/maestro" element={<Maestro />} />
        <Route path="/admi" element={<Admi />} />
        <Route path="/perfilAlumno" element={<PerfilAlumno />} />
        <Route path="/historialAlumno" element={<Historial />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/registro" element={<RegistrarUsuario />} />
        <Route path="/perfilMaestro" element={<PerfilMaestro />} />
        <Route path="/calendarioMaestro" element={<CalendarioMaestro />} />

      </Routes>
    </Router>
  );
}

export default App;