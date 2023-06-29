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
    const [datos, setDatos] = useState({});
    const [plataformas, setPlataformas] = useState({});
    const [generos, setGeneros] = useState({});
    // filtros
    const [nombre, setName] = useState("");
    const [plataforma, setPlataform] = useState("");
    const [genero, setGender] = useState("");
    const [orden, setOrder] = useState("ascending");
    // almacenamiento de error
    const [erro, setError] = useState("")
    const [platEr, setPlater] = useState(false)
    const [genEr, setGener] = useState(false)

    useEffect (() => {
        if (!generos) getGeneros()
        }, []);

    useEffect (() => {
        if (!plataformas) getPlataformas()
        }, []);

    useEffect (() => {
        if (!datos) getJuegos([nombre, plataforma, genero, orden])
        }, [nombre, plataforma, genero, orden]);

    function CheckError() {
        useEffect (() => {
            checkErrorResolution()
            }, [datos, plataformas, generos]);    
    }

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

    const getJuegos = async (params = "") => {
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

    const createList = () => {
        return (
            datos.map(element => {
                return(
                    <div className = 'bloque_info' key = {element.id}>
                        <div className = 'interface'> {/* tiene float right y se muestra cuando hacemos hover*/}
                            <img className ='interface_image' src = {form}/> 
                            {/* hay 3 formas de hacerlo (investigar):
                            - Tomar los elementos del div y modificarlos. No requiere cambiar el diseño
                            - Hacer una ventana flotante donde se relllenen los datos
                            - Enviar a otra página (el más fácil)
                            */}
                            <img className ='interface_image' src = {delet}/>
                        </div>
                        <img className='reducir_img' src={"data"+element.tipo_imagen+":;charset=utf8;base64"+element.imagen}/>
                        <div className = 'info_right'>
                            <p className = 'boldeable'>{element.nombre}</p>
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

    function checkErrorResolution () {
        let plat_error = "";
        let gen_error = ""
        if (platEr) plat_error = 'No se han podido cargar los géneros. '
        if (genEr) gen_error = 'No se han podido cargar las plataformas. '
        setError (plat_error + gen_error)
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

    function cargarDatos () {
        if (!plataformas) getPlataformas();
        if (!generos) getGeneros();
        if (!datos) getJuegos();
    }

    const showError = () => {
        return (
            <p>Error: {erro}</p>
        )
    }
    return (
        <div>
            {cargarDatos()}
            {console.log(generos[1])}
            <div className = "busqueda_header">
                <div>
                    <label>Buscar:</label>
                    <input type='text' onChange={(e) => changeName(e.changeName)}/>
                    <p className = {(typeof nombre === 'string')&&(nombre.length > 0) ? "bloque" : "invisible"}>Mostrando resultados para: {nombre}</p>
                </div>
                <div id = "info_busqueda" className = "busqueda_header">
                    <div>
                        <label>Género:</label>
                        <select defaultValue={"not_valid"} id = "header_genero">
                            <option  value = "not_valid">Seleccionar género</option>
                            {
                                Array.isArray(generos) ? generos.map( (gen, genKey) => {
                                    return (
                                        <option key={genKey} onChange={(e) => changeGender(e.changeGender)}>{gen.nombre}</option>
                                    )
                                }) : (!genEr) ? setGener (true) : null
                            }
                        </select>
                    </div>
                    <div>
                        <label>Plataforma:</label>
                        <select defaultValue="not_valid" id = "header_plataforma">
                            <option value = "not_valid">Seleccionar plataforma</option>
                            {
                                Array.isArray(plataformas) ? plataformas.map( (plat, platKey) => {
                                    return (
                                        <option onChange={(e) => changePlataform(e.changePlataform)} key = {platKey}>{plat.nombre}</option>
                                    )
                                }) : (!platEr) ? setPlater (true) : null
                            }
                        </select><br></br>
                    </div>
                    <div>
                        <img className='ascending_or' src={(orden == 'ascending') ? ascending : descending} onClick={() => changeOrder ()}/>
                    </div>
                </div>
                <button className = "boton_bonito" href = "/new">Agregar</button>
            </div>
            <div className = "lista">
                {CheckError()}
                {erro ? showError() : null}
                {(Array.isArray(datos) && (datos.length > 0)) ? createList() : notFound()}
            </div>
        </div>
    );
};

export default Dashboard;
