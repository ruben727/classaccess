import React from "react";
import Login from "./components/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admi from "./admi/dashboardAdmi";
import Maestro from "./maestro/dashboardMestros";
import Alumno from "./alumno/dashboardAlumno";
import PerfilAlumno from "./alumno/perfilAlumno";
import Historial from "./alumno/historialAlumno";
import Usuarios from "./admi/usuarios";


function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Login/>}/> 
       <Route path="/alumno" element={<Alumno/>}></Route>
       <Route path="/maestro" element={<Maestro/>}/>
       <Route path="/admi" element={<Admi/>}/>
       <Route path="/perfilAlumno" element={<PerfilAlumno/>}/>
       <Route path="/historialAlumno" element={<Historial/>}/>
       <Route path="/usuarios" element={<Usuarios/>}/>

      </Routes>
    </Router>
  );
}

export default App;
