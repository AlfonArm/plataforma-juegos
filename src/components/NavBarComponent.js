import React from 'react';
import {Router, Link } from "react-router-dom";
import Navegacion from "./HeaderComponent";

const  NavBarComponent = () => {
    return (
        <div className='barra_inicio'>
            <Link to="/">Juegos</Link>
            <Link to="/generos">Generos</Link>
            <Link to="/plataformas">Plataformas</Link>
        </div>
    )
}

export default NavBarComponent
