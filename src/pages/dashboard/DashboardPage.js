import Navegacion from '../../components/HeaderComponent';
import React, {useState, useEffect} from 'react';
import {fetchUserData, deleteUserData, modifyUserData, createData} from '../../axios'

const Dashboard = () => {
    const [datos, setDatos] = useState([]);
    const [plataformas, setPlataformas] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [nombre, setName] = useState("");
    const [plataforma, setPlataform] = useState("");
    const [genero, setGender] = useState("");
    const [orden, setOrder] = useState("ascending");

    useEffect (loadData, []);
    useEffect (() => setDatos(fetchUserData("/juegos", nombre, plataforma, genero, orden)), [nombre, plataforma, genero, orden]);

    function loadData () {
        setGeneros(fetchUserData('/generos'));
        setPlataformas(fetchUserData('/plataformas'));
    }
    
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

    const createList = () => {
        return (
            datos.map(element => {
                return(
                    <div class = 'bloque_info' key = {element.id}>
                        <div class = 'interface'> {/* tiene float right y se muestra cuando hacemos hover*/}
                            <img class ='interface_image' src = '../../styles/modify' onClick = {}/> 
                            {/* hay 3 formas de hacerlo (investigar):
                            - Tomar los elementos del div y modificarlos. No requiere cambiar el diseño
                            - Hacer una ventana flotante donde se relllenen los datos
                            - Enviar a otra página (el más fácil)
                            */}
                            <img class ='interface_image' src = '../../styles/delete' onClick = {}/>
                        </div>
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
            <Navegacion></Navegacion>
            <div class = "busqueda_header">
                <div>
                    <label>Buscar:</label>
                    <input type='text' onChange={e => changeName(e.changeName)}/>
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
                                        <option key = {genKey} onChange={e => changeGender(e.changeGender)}>{gen}</option>
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
                                        <option onChange={e => changePlataform(e.changePlataform)} key = {platKey}>{plat}</option>
                                    )
                                })
                            }
                        </select><br></br>
                    </div>
                    <div>
                        <label>Orden:</label>
                        <img className='ascending_or' key={orden} src={'../../styles/'+orden} onClick={orden == 'ascending' ? changeOrder ('descending') : changeOrder ('ascending')}/>
                    </div>
                    {/* pendiente a sacar*/}
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
