import './App.css';
import React from 'react';
import Dashboard from "../src/pages/dashboard/DashboardPage";
import Generos from "../src/pages/generos/Generos";
import Plataformas from "../src/pages/plataformas/Plataformas";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GeneroModify from "./pages/generos/editPage";
import GeneroNew from "./pages/generos/NewPage"
import PlataformaModify from "./pages/plataformas/editPage";
import PlataformaNew from "./pages/plataformas/NewPage"
import NewGame from "./pages/dashboard/NewPage" // no es necesario
import NavBarComponent from './components/NavBarComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent'



function App() {
  return (
    <BrowserRouter>       
    <HeaderComponent/>
    <NavBarComponent/>
    <Routes>
        <Route path="/generos/edit/:id" element={<GeneroModify/>} />
        <Route path="/generos/new" element={<GeneroNew/>} />
        <Route path="/plataformas/edit/:id" element={<PlataformaModify/>} />
        <Route path="/plataformas/new" element={<PlataformaNew/>} />
        <Route exact path="/generos" element={<Generos/>} />
        <Route exact path="/plataformas" element={<Plataformas/>} />
        <Route exact path="/" element={<Dashboard/>} />
        {/*<Route path="/new" element={<NewGame/>}/> no se pedía*/}
    </Routes>
    <FooterComponent/>
    </BrowserRouter>
  );
}; 

export default App;
