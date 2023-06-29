import React from 'react';
import {Router, Link } from "react-router-dom";
import Navegacion from "./HeaderComponent";

const  NavBarComponent = () => {
    return (
        <div className='barra_inicio'>
            <Link to="/">Juegos</Link> <br></br>
            <Link to="/generos">Generos</Link> <br></br>
            <Link to="/plataformas">Plataformas</Link> <br></br>
        </div>
    )
}

export default NavBarComponent
