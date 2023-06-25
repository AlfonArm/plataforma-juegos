import './App.css';
import React, {Switch} from 'react';
import Dashboard from "../src/pages/dashboard/DashboardPage";
import Generos from "../src/pages/generos/Generos";
import Plataformas from "../src/pages/plataformas/Plataformas";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardModify from "../src/pages/dashboard/DashboardModify";
import GeneroModify from "../src/pages/generos/editPage";
import PlataformaModify from "./pages/plataformas/editPage";



function App() {
  return (
    <BrowserRouter>       
    <Routes>
      <Switch>
        <Route path="/edit/:id" element={<DashboardModify/>} />
        <Route path="/genero/edit/:id" element={<GeneroModify/>} />
        <Route path="/plataforma/edit/:id" element={<PlataformaModify/>} />
        <Route exact path="/generos" element={<Generos/>} />
        <Route exact path="/plataformas" element={<Plataformas/>} />
        <Route exact path="/" element={<Dashboard/>} />
      </Switch>
    </Routes>     
    </BrowserRouter>
  );
}; 

export default App;
