import React from "react";
import Login from "./components/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Admin
import Admi from "./admi/dashboardAdmi";
import Usuarios from "./admi/usuarios";
import RegistrarUsuario from "./admi/registrarUsuario";
import PerfilAdmin from "./admi/perfilAdmi";
import EnviarNotificaciones from "./admi/enviarNotificaciones";
import Reportes from "./admi/reportes";
import Dispositivos from "./admi/dispositivos";
import Aulas from "./admi/aulas";
import Asistencias from "./admi/asistencias";

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

        <Route path="/codigo_Qr" element={<Codigo_QR/>} />
        <Route path="/CodigoQR" element={<CodigoQr />} />

        <Route path="/perfilAdmi" element={<PerfilAdmin/>}/>
        <Route path="/reportes" element={<Reportes/>}/>
        <Route path="/enviarNotificaciones" element={<EnviarNotificaciones/>} />

        <Route path="/dispositivos" element={<Dispositivos/>}/>
        <Route path="/aulas" element={<Aulas/>}/>
        <Route path="/asistencias" element={<Asistencias/>}/>
      

      </Routes>
    </Router>
  );
}

export default App;