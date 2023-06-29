import {useState, useEffect} from 'react';
import {fetchUserData} from "../../axios/fetchUserData";
// imágenes
import ascending from "../../styles/ascending.png"
import descending from "../../styles/descending.png"
import form from "../../styles/form.png"
import not_found from "../../styles/not_found.png"
import delet from "../../styles/delete.png"



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
    const [platEr, setPlater] = useState((Array.isArray(plataformas))&&(plataformas.length > 0))
    const [genEr, setGener] = useState((Array.isArray(generos))&&(generos.length > 0))

    useEffect (() => {
        if (!generos) getGeneros()
        }, []);

    useEffect (() => {
        if (!plataformas) getPlataformas()
        }, []);

    useEffect (() => {
        getJuegos({name: nombre, idPlataform: plataforma, idGender: genero, ascending: orden})
        }, [nombre, plataforma, genero, orden]);

    useEffect (() => {
        checkErrorResolution()
        }, [datos, plataformas, generos]);

    const getGeneros = async () => {
        try {
            const data = await fetchUserData('/generos');
            if (data) {

                setGeneros(data);
            }
        } catch (e) {
            setError(erro + '\n' + e)
        }
    }

    const getPlataformas = async () => {
        try {
            const data = await fetchUserData('/plataformas');
            if (data) {
                setPlataformas(data);
            }
        } catch (e) {
            setError(erro +'\n'+ e)
        }
        
    }

    const getJuegos = async (params) => {
        try {
            const data = await fetchUserData('/juegos', params);
            if (data) {
                setDatos(data);
            }
        } catch (e) {
            setError(erro +'\n'+ e);
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
                let i = 1;
                while (nombre == 'no disponible') {
                    if (objeto[i].id == id) nombre = objeto[i].nombre; 
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
                    <div className = 'bloque_info' key = {element.id}>
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

    function checkErrorResolution () {
        let plat_error = "";
        let gen_error = ""
        if (platEr) plat_error = 'No se han podido cargar los géneros. '
        if (genEr) gen_error = 'No se han podido cargar las plataformas. '
        setError (erro + plat_error + gen_error)
    }

    const notFound = () => {
        return (
            <div className= 'flex justify_center'>
                <div>
                    <img src = {not_found} id = 'not_found'/>
                    <p>No se han encontrado resultados</p>
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
                    <input type='text' onChange={(e) => changeName(e.changeName)}/>
                </div>
                <div id = "info_busqueda" className = "busqueda_header">
                    <div>
                        <label>Género:</label>
                        <select defaultValue={"not_valid"} id = "header_genero" onChange={() => changeGender(document.getElementById("header_genero").value)}>
                            <option  value = "not_valid">Seleccionar género</option>
                            {
                                Array.isArray(generos) ? generos.map( (gen, genKey) => {
                                    return (
                                        <option key={genKey} onChange={(e) => changeGender(gen.id)}>{gen.nombre}</option>
                                    )
                                }) : null
                            }
                        </select>
                    </div>
                    <div>
                        <label>Plataforma:</label>
                        <select defaultValue="not_valid" id = "header_plataforma" onChange={() => changePlataform(document.getElementById("header_plataforma").value)} >
                            <option value = "not_valid">Seleccionar plataforma</option>
                            {
                                Array.isArray(plataformas) ? plataformas.map( (plat, platKey) => {
                                    return (
                                        <option key = {platKey}>{plat.nombre}</option>
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
            <div className = "lista">
                {erro ? showError() : null}
                {(Array.isArray(datos) && (datos.length > 0)) ? createList() : notFound()}
            </div>
        </div>
    );
};

export default Dashboard;
