import './App.css';
import React, {Switch} from 'react';
import Dashboard from "../src/pages/dashboard/DashboardPage";
import Generos from "../src/pages/generos/Generos";
import Plataformas from "../src/pages/plataformas/Plataformas";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardDelete from "../src/pages/dashboard/DashboardDelete";
import DashboardModify from "../src/pages/dashboard/DashboardModify";
import GeneroDelete from "../src/pages/generos/GeneroDelete";
import GeneroModify from "../src/pages/generos/GeneroModify";
import PlataformaDelete from "../src/pages/plataformas/PlataformaDelete";
import PlataformaModify from "../src/pages/plataformas/PlataformaModify";



function App() {
  return (
    <BrowserRouter>       
    <Routes>
      <Switch>
        <Route path="/delete/:id" element={<DashboardDelete/>} />
        <Route path="/modify/:id" element={<DashboardModify/>} />
        <Route path="/genero/modify/:id" element={<GeneroModify/>} />
        <Route path="/genero/delete/:id" element={<GeneroDelete/>} />
        <Route path="/plataforma/modify/:id" element={<PlataformaModify/>} />
        <Route path="/plataforma/delete/:id" element={<PlataformaDelete/>} />
        <Route exact path="/generos" element={<Generos/>} />
        <Route exact path="/plataformas" element={<Plataformas/>} />
        <Route exact path="/" element={<Dashboard/>} />
      </Switch>
    </Routes>     
    </BrowserRouter>
  );
}; 

export default App;
