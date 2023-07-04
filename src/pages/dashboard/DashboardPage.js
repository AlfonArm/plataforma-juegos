import {useState, useEffect} from 'react';
import {fetchUserData} from "../../axios/fetchUserData";
import { fetchGames } from '../../axios/fetchGames';
// imágenes
import ascending from "../../styles/ascending.png"
import descending from "../../styles/descending.png"
import not_found from "../../styles/not_found.png"



const Dashboard = () => {
    
    // conjuntos de datos a cargar
    const [datos, setDatos] = useState();
    const [plataformas, setPlataformas] = useState();
    const [generos, setGeneros] = useState();
    // filtros
    const [nombre, setName] = useState("");
    const [plataforma, setPlataform] = useState("");
    const [genero, setGender] = useState("");
    const [orden, setOrder] = useState("ascending");
    // almacenamiento de error
    const [erro, setError] = useState("")

    try {
    useEffect (() => {
        if (!generos) getGeneros()
        }, []);
    } catch (e) {
        setGeneros([])
        setError (erro + e.message)
    }
    
    const getGeneros = async () => {
        let response;
        try {
            response = await fetchUserData('/generos');
            if (typeof response === 'string') {
                throw new Error (response);
            } else {
                if (('status' in response) && ('statusText' in response)) {
                    if ((response.status >= 200)&&(response.status < 300)) {
                        setGeneros(response.data);
                    } else {
                        throw new Error (response.status + ': ' + response.statusText)
                    }
                } else {
                    throw new Error ('No hubo respuesta')
                }
            }
        } catch (e) {
            setError (e.message)
        }
    }

    try {
    useEffect (() => {
        if (!plataformas) getPlataformas()
        }, []);
    } catch (e) {
        setPlataformas([])
        setError (erro + e.message)
    }
    
    const getPlataformas = async () => {
        let response;
        try {
            response = await fetchUserData('/plataformas');
            if (typeof response === 'string') {
                throw new Error (response);
            } else {
                if (('status' in response) && ('statusText' in response)) {
                    if ((response.status >= 200)&&(response.status < 300)) {
                        setPlataformas(response.data)
                    } else {
                        throw new Error (response.status + ': ' + response.statusText)
                    }
                } else {
                    throw new Error ('No hubo respuesta')
                }
            }
        } catch (e) {
            setError (e.message)
        }
    }

    try {
    useEffect (() => {
        getJuegos()
        }, [nombre, genero, plataforma, orden]);
    } catch (e) {
        setDatos([])
        setError (erro + e.message)
    }
    
    const getJuegos = async () => {
        let response;
        try {
            response = await fetchGames('/juegos', {name: nombre, idGender: genero, idPlataform: plataforma, ascending: orden == 'ascending'}); // por alguna extraña razón, usando un módulo a parte funciona
            if (typeof response === 'string') {
                throw new Error (response);
            } else {
                if (('status' in response) && ('statusText' in response)) {
                    if ((response.status >= 200)&&(response.status < 300)) {
                        setDatos(response.data);
                    } else {
                        throw new Error (response.status + ': ' + response.statusText + '. ')
                    }
                } else {
                    throw new Error ('502: Respuesta inválida/no hay respuesta')
                }
            }
        } catch (e) {
            setError (e.message)
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
    
    const changeOrder = () => {
        if (orden == 'descending') setOrder('ascending')
        else setOrder('descending')
    };

    function devolverNombre (id = 1, objeto = []) {
        try {
            let nombre = 'no disponible';
            if (Array.isArray(objeto)) {
                let i = 0;
                while (nombre == 'no disponible') {
                    if ((i in objeto)&&('id' in objeto[i])&&(objeto[i].id == id)) nombre = objeto[i].nombre; 
                    i++;
                }
            }
            return nombre;
        } catch (e) {
            console.log (e);
        }
    }
    const createList = () => {
        return (
            datos.map((element) => {
                return(
                    <div className = 'bloque_info tamaño_minimo' key = {element.id}>
                        <img className='reducir_img' src={"data:"+element.tipo_imagen+";charset=utf8;base64,"+element.imagen}/>
                        <div className = 'info_right'>
                            <p className = 'boldeable'>{element.nombre}</p>
                            <p>{element.descripcion}</p>
                            <p>Género: {devolverNombre(element.id_genero, generos)}</p>
                            <p>Plataforma: {devolverNombre(element.id_plataforma, plataformas)}</p>
                            <p>Página web: {element.url}</p>
                        </div>
                    </div>
                )
            })
        )
    }

    const notFound = () => {
        return (
            <div className= 'flex justify_center'>
                <div>
                    <img src = {not_found} id = 'not_found'/>
                    <p>No se han encontrado resultados</p>
                    {erro ? showError() : null}
                </div>
            </div>
        )
    }

    const showError = () => {
        return (
            <p>Error: {erro}</p>
        )
    }
    return (
        <div>
            <div className = "busqueda_header">
                <div>
                    <label>Buscar:</label>
                    <input type='text' onChange={(e) => changeName(e.target.value)}/>
                </div>
                <div id = "info_busqueda" className = "busqueda_header">
                    <div>
                        <label>Género:</label>
                        <select defaultValue="" id = "header_genero" onChange={() => changeGender(document.getElementById("header_genero").value)}>
                            <option  value = "">Seleccionar género</option>
                            {
                                Array.isArray(generos) ? generos.map( (gen, genKey) => {
                                    return (
                                        <option key={genKey} value = {gen.id}>{gen.nombre}</option>
                                    )
                                }) : null
                            }
                        </select>
                    </div>
                    <div>
                        <label>Plataforma:</label>
                        <select defaultValue="" id = "header_plataforma" onChange={() => changePlataform(document.getElementById("header_plataforma").value)} >
                            <option value = "">Seleccionar plataforma</option>
                            {
                                Array.isArray(plataformas) ? plataformas.map( (plat, platKey) => {
                                    return (
                                        <option key = {platKey} value = {plat.id}>{plat.nombre}</option>
                                    )
                                }) : null
                            }
                        </select><br></br>
                    </div>
                    <div>
                        <img className='ascending_or' src={(orden == 'ascending') ? ascending : descending} onClick={() => changeOrder ()}/>
                    </div>
                </div>
            </div>
            <div className = "lista tamaño_minimo">
                {(Array.isArray(datos) && (datos.length > 0)) ? createList() : notFound()}
            </div>
        </div>
    );
};

export default Dashboard;
