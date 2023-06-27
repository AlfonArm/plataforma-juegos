import React from 'react';
import {Router, Link } from "react-router-dom";
import Navegacion from "./HeaderComponent";

const  NavBarComponent = () => {
    return (
        <div className='barra_inicio'>
            <Router>
                <ul>
                    <li>
                        <Link to="/">Juegos</Link>
                    </li>
                    <li>
                        <Link to="/generos">Generos</Link>
                    </li>
                    <li>
                        <Link to="/plataformas">Plataformas</Link>
                    </li>
                </ul>
            </Router>
        </div>
    )
}

export default NavBarComponent
