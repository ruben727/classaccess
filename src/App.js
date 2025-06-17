import React from "react";
import Login from "./components/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admi from "./admi/dashboardAdmi";
import Maestro from "./maestro/dashboardMestros";
import Alumno from "./alumno/dashboardAlumno";


function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Login/>}/> 
       <Route path="/alumno" element={<Alumno/>}></Route>
       <Route path="/maestro" element={<Maestro/>}/>
       <Route path="/admi" element={<Admi/>}/>

      </Routes>
    </Router>
  );
}

export default App;
