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
<<<<<<< HEAD

=======
import MenuAlumno from "./alumno/menuAlumno";
import Calendario from "./alumno/Calendario";
import Reportes from "./admi/reportes";
<<<<<<< HEAD
import Notificationes from "./alumno/Notificaciones_alumno";
=======
>>>>>>> 81f785b4b9c1fc3e9c151f4279f32549b10d127d
>>>>>>> 5cccf078698e78fe03c55393dbf28db21d1efa51

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Rutas alumno */}
        <Route path="/alumno" element={<Alumno />} />
        <Route path="/perfilAlumno" element={<PerfilAlumno />} />
        <Route path="/historialAlumno" element={<Historial />} />
        <Route path="/CodigoQR" element={<CodigoQr />} />
        <Route path="/menuAlumno" element= {<MenuAlumno/>}></Route>
        <Route path="/Calendario" element = {<Calendario/>}></Route>
        <Route path = "/Notificaciones_alumno"element = {<Notificationes/>}></Route>

        {/* Rutas maestro */}
        <Route path="/maestro" element={<Maestro />} />
        <Route path="/perfilMaestro" element={<PerfilMaestro />} />
        <Route path="/calendarioMaestro" element={<CalendarioMaestro />} />
        <Route path="/codigo_Qr" element={<Codigo_QR/>} />

<<<<<<< HEAD
        <Route path="/codigo_Qr" element={<Codigo_QR/>} />
=======
        {/* Rutas admin */}
        <Route path="/admi" element={<Admi />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/registro" element={<RegistrarUsuario />} />
        <Route path="/perfilAdmin" element={<PerfilAdmin />} />
        <Route path="/asistencias" element={<Asistencias />} />
        <Route path="/notificaciones" element={<EnviarNotificaciones />} />
       <Route path="/codigo_Qr" element={<Codigo_QR/>} />
>>>>>>> 81f785b4b9c1fc3e9c151f4279f32549b10d127d
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
