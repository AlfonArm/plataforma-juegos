import React from 'react';
import {Router, Link } from "react-router-dom";

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