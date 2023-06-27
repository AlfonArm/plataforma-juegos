//import './App.css';
import React from 'react';
import Dashboard from "../src/pages/dashboard/DashboardPage";
import Generos from "../src/pages/generos/Generos";
import Plataformas from "../src/pages/plataformas/Plataformas";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GeneroModify from "./pages/generos/editPage";
import GeneroNew from "./pages/generos/NewPage"
import PlataformaModify from "./pages/plataformas/editPage";
import PlataformaNew from "./pages/plataformas/NewPage"
import NewGame from "./pages/dashboard/NewPage"



function App() {
  return (
    <BrowserRouter>       
    <Routes>
        <Route path="/genero/edit/:id" element={<GeneroModify/>} />
        <Route path="/genero/new" element={<GeneroNew/>} />
        <Route path="/plataforma/edit/:id" element={<PlataformaModify/>} />
        <Route path="/plataforma/new" element={<PlataformaNew/>} />
        <Route exact path="/generos" element={<Generos/>} />
        <Route exact path="/plataformas" element={<Plataformas/>} />
        <Route exact path="/" element={<Dashboard/>} />
        <Route path="/new" element={<NewGame/>}/>
    </Routes>     
    </BrowserRouter>
  );
}; 

export default App;
