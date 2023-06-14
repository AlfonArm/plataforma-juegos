import './App.css';

import Dashboard from "../src/pages/Dashboard";
import Generos from "../src/pages/Generos";
import Plataformas from "../src/pages/Plataformas";

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
