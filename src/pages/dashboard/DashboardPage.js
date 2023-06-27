import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent'
import navBarComponent from '../../components/NavBarComponent'
import {useState, useEffect} from 'react';
import {fetchUserData} from "../../axios/fetchUserData";

const Dashboard = () => {
    
    const [datos, setDatos] = useState([]);
    const [plataformas, setPlataformas] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [nombre, setName] = useState("");
    const [plataforma, setPlataform] = useState("");
    const [genero, setGender] = useState("");
    const [orden, setOrder] = useState("ascending");

    useEffect (() => {
        if (!generos) getGeneros()
        }, []);

    useEffect (() => {
        if (!plataformas) getPlataformas()
        }, []);

    useEffect (() => {
        if (!datos) getJuegos([nombre, plataforma, genero, orden])
        }, [nombre, plataforma, genero, orden]);
 
    const getGeneros = async () => {
        const data = await fetchUserData('/generos');
        if (data) {
            setGeneros(data);
        }
    }

    const getPlataformas = async () => {
        const data = await fetchUserData('/generos');
        if (data) {
            setGeneros(data);
        }
    }

    const getJuegos = async (params) => {
        const data = await fetchUserData('/generos', params);
        if (data) {
            setGeneros(data);
        }
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
                            <img class ='interface_image' src = '../../styles/modify'/> 
                            {/* hay 3 formas de hacerlo (investigar):
                            - Tomar los elementos del div y modificarlos. No requiere cambiar el diseño
                            - Hacer una ventana flotante donde se relllenen los datos
                            - Enviar a otra página (el más fácil)
                            */}
                            <img class ='interface_image' src = '../../styles/delete'/>
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

    function agregarJuego () {
        return null
    }

    console.log(generos);
    return (
        <div>
            <HeaderComponent/>
            <navBarComponent/>
            {/*
            <div class = "busqueda_header">
                <div>
                    <label>Buscar:</label>
                    <input type='text' onChange={(e) => changeName(e.changeName)}/>
                    <p className = {nombre.length === 0 ? "invisible" : "bloque"}>Mostrando resultados para: {nombre}</p>
                </div>
                <div id = "info_busqueda" className = "busqueda_header">
                    <div>
                        <label>Género:</label>
                        <select id = "header_genero">
                            <option selected value = "not_valid">Seleccionar género</option>
                            {
                                generos && generos.map( (gen, genKey) => {
                                    return (
                                        <option key={genKey} onChange={(e) => changeGender(e.changeGender)}>{gen.nombre}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label>Plataforma:</label>
                        <select id = "header_plataforma">
                            <option selected value = "not_valid">Seleccionar plataforma</option>
                            {
                                plataformas && plataformas.map( (plat, platKey) => {
                                    return (
                                        <option onChange={(e) => changePlataform(e.changePlataform)} key = {platKey}>{plat.nombre}</option>
                                    )
                                })
                            }
                        </select><br></br>
                    </div>
                    <div>
                        <label>Orden:</label>
                        <img className='ascending_or' key={orden} src={'../../styles/'+orden} onClick={orden === 'ascending' ? changeOrder ('descending') : changeOrder ('ascending')}/>
                    </div>
                </div>
                <button  class = "boton_bonito" onClick={agregarJuego}>Agregar</button>
            </div>
            */}
            <div class = "lista">
                {datos.length === 0 ? notFound() : createList()}
            </div>
            <FooterComponent/>
        </div>
    );
};

export default Dashboard;
