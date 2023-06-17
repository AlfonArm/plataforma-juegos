import './App.css';
import React from 'react';
import Dashboard from "../src/pages/dashboard/DashboardPage";
import Generos from "../src/pages/generos/Generos";
import Plataformas from "../src/pages/plataformas/Plataformas";
import Axios from "./axios"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>       
    <Routes>           
      <Route path="/" element={<Dashboard/>} />           
      <Route path="/generos" element={<Generos/>} />       
      <Route path="/plataformas" element={<Plataformas/>} />
    </Routes>     
    </BrowserRouter>
  );
}; 

export default App;
