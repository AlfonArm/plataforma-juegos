import Navegacion from '../../components/HeaderComponent';
import React, {useState} from 'react';
import obtener from '../../axios'

const Dashboard = () => {
    const [nombre, setName] = useState("");
    
    const changeName = (newName) => {
        setName(newName);
    };

    return (
        <div>
            {obtener('/generos/')}
            <Navegacion></Navegacion>
            <p>Página principal</p>
            <div>
                <input type='text' onChange={e => changeName(e.target.value)}/>
                <p className = {nombre.length == 0 ? "invisible" : "bloque"}>Mostrando resultados para: {nombre}</p>
            </div>
        </div>
    );
};

export default Dashboard;