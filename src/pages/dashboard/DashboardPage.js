import Navegacion from '../../components/HeaderComponent';
import React, {useState} from 'react';
import fetchUserData from '../../axios'

let datos = [];
let plataformas = [];
let generos = [];
let params = [];
const Dashboard = () => {
    const [nombre, setName] = useState("");
    const [plataforma, setPlataform] = useState("");
    const [genero, setGender] = useState("");
    const [orden, setOrder] = useState("");
    setOrder('ascending');

    const [url, setUrl] = useState("");
    
    const changeName = (newName) => {
        setName(newName);
    };

    const changeGender = (newGender) => {
        setGender(newGender);
    };
    
    const changePlataform = (newPlataform) => {
        setPlataform(newPlataform);
    };
    
    const changeOrder = (newOrder) => {
        setOrder(newOrder);
    };

    const updateValues = (newName, newPlataform, newGender, newOrder) => {
        if (newName != nombre) changeName(newName);
        if (newPlataform != plataforma) changePlataform(newPlataform);
        if (newGender != genero) changeGender(newGender);
        if (newOrder != orden) changeOrder(newOrder);
        params = {
            name: nombre,
            idPlataform: plataforma,
            idGender: genero
        };
        if (orden) params.ascending = true;
        else params.ascending = false;
        datos = fetchUserData('/juegos', params).data;
    }

    const createList = () => {
        return (
            datos.forEach(element => {
                return(
                    <div class = 'bloque_info' key = {element.id}>
                        <img class='reducir_img' src={"data"+element.tipo_imagen+":;charset=utf8;base64"+element.imagen}/>
                        <div class = 'info_right'>
                            <p class = 'boldeable'>{element.nombre}</p>
                            <p>{element.descripcion}</p>
                            <p>Género: {element.id_genero}</p>
                            <p>Plataforma: {element.id_plataforma}</p>
                            <p>Página web: {element.url}</p>
                        </div>
                    </div>
                )
            })
        )
    }

    const notFound = () => {
        return (
            <div class = 'flex justify_center'>
                <div>
                    <img src = 'images/not_found.png' id = 'not_found'/>
                    <p>No se han encontrado resultados</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            {datos = fetchUserData('/juegos', {})}
            {console.log(datos)}
            {plataformas = fetchUserData('/plataformas', {}).data}
            {generos = fetchUserData('/generos', {}).data}
            <Navegacion></Navegacion>
            <div class = "busqueda_header">
                <div>
                    <label>Buscar:</label>
                    <input type='text' onChange={e => updateValues(e.changeName, plataforma, genero, orden)}/>
                    <p className = {nombre.length == 0 ? "invisible" : "bloque"}>Mostrando resultados para: {nombre}</p>
                </div>
                <div action = "index.php" id = "info_busqueda" class = "busqueda_header">
                    <div>
                        <label>Género:</label>
                        <select id = "header_genero" name = "genero">
                            <option selected value = "not_valid">Seleccionar género</option>
                            {
                                generos.map( (genKey, gen) => {
                                    return (
                                        <option key = {genKey} onChange={e => updateValues(nombre, plataforma, e.changeGender, orden)}>{gen}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label>Plataforma:</label>
                        <select id = "header_plataforma" name = "plataforma">
                            <option selected value = "not_valid">Seleccionar plataforma</option>
                            {
                                plataformas.map( (platKey, plat) => {
                                    return (
                                        <option onChange={e => updateValues(nombre, e.changePlataform, genero, orden)} key = {platKey}>{plat}</option>
                                    )
                                })
                            }
                        </select><br></br>
                        <img className='ascending_or' key={orden} src={'../../styles/'+orden} onClick={orden == 'ascending' ? changeOrder ('descending') : changeOrder ('ascending')}/>
                    </div>
                    <div>
                        <label>Orden:</label>
                        {/* reemplazar por un boton que sea interactivo de una flecha abajo o arriba*/}
                        <select id = "header_orden" name = "orden">
                            <option selected value = '1'>Ascendente</option>
                            <option value = '2'>Descendente</option>
                        </select>
                    </div>
                    <div>
                        <input type = "submit" value = "Buscar" id = "busqueda_juego" name = "buscar"/>
                    </div>
                </div>
                <button  class = "boton_bonito" onclick = "agregarJuego()" role="button">Agregar</button>
            </div>
            <div class = "lista">
                {datos.length == 0 ? notFound() : createList()}
            </div>
        </div>
    );
};

export default Dashboard;