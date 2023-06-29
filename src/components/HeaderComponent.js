import React from 'react'
import logo from '../styles/logo.png'
export const Navegacion = () => {
  return (
    <div>
        <div className = "inicio">
            <img src={logo} className = "logo"/>
            <h1><span>Game</span>pedia</h1>
            <p>Donde los gamers se unen</p>
        </div>
    </div>
  )
}

export default Navegacion;