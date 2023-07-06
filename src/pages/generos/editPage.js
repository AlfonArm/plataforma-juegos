import react, {useState, useEffect, useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import modifyUserData from '../../axios/modifyUserData'
import {fetchUserData} from "../../axios/fetchUserData";
import not_found from '../../styles/not_found.png'

const EditPage = () => {
    const [nombre, setName] = useState();
    const [err, setError] = useState();

    const { id } = useParams();
    const navigate = useNavigate();
    const genderId = id

    const nombreRef = useRef(null);
    const respuestaRef = useRef(null);

    try {
        useEffect (() => {
            if (!nombre) conseguirNombre()
            }, []);
    } catch (e) {
        setError (e.message)
    }

    const conseguirNombre = async () => {
        let response;
        try {
            response = await fetchUserData('/generos');
            if (typeof response === 'string') {
                throw new Error (response);
            } else {
                if (('status' in response) && ('statusText' in response)) {
                    if ((response.status >= 200)&&(response.status < 300)) {
                        setName(exists(response.data))
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



    function exists (generos) {
        try {
            console.log(generos)
            console.log(Array.isArray(generos))
            console.log()
            if ((generos)&&(Array.isArray(generos))) {
                let existe = false;
                let i = -1; // sino no lee el elemento 0 :P
                while ((!existe)&&(generos.length > i)) {
                    i++;
                    if (i in generos) {
                        if (generos[i].id == genderId) {
                            existe = true;
                            if (typeof generos[i].nombre === 'string') console.log('encontre '+generos[i].nombre+' en '+generos[i].id)
                        }
                    }
                }
                if ((i in generos)&&(typeof generos[i].nombre === 'string')&&(existe)) {
                    return generos[i].nombre
                } else {
                    setError ('El elemento no existe');
                    }
            } else {
                setError('No hay datos guardados');
            }
        } catch (er) {
            console.log(er)
            setError(er.message);
        }
    }

    async function editar () {
        const nombre = nombreRef.current.value;
        const respuesta = respuestaRef.current;
        if (typeof nombre === 'string') {
            if ((nombre == null)||(nombre.length == 0)) {
                respuesta.textContent = 'Debe insertar un valor válido';
            } else {
                try {
                    const result = await modifyUserData('/generos/'+genderId, {name: nombre});
                    if (typeof result === 'string') {
                        throw new Error (result);
                    } else {
                        if (result && ('status' in result)) {
                            if ((result.status >= 200)&&(result.status < 300)) {
                                alert('Se ha editado a '  + nombre)
                                navigate('/generos');
                            } else {
                                throw new Error ('Error: ' + result.status + '. ' + result.statusText);
                            }
                        } else {
                            throw new Error ('Error desconocido en la recepción de la respuesta');
                        }
                    }
                } catch (e) {
                    alert (e.message);
                }
            }
        }
    }

    const chargeForm = () => {
        return (
            <form className="cuadro form chiquito">
                <div className = "top_form">
                    <p>Editar:</p>
                </div>
                <div className = "flex"> 
                    <fieldset>
                        <legend>Nombre</legend>
                        <input placeholder="Nombre del género" ref = {nombreRef} type='text' value={nombre} onChange={(e) => setName(e.target.value)}/>
                        <p ref = {respuestaRef}></p>
                    </fieldset>
                </div>
                <input type = "button" onClick={() => editar()} value="Subir"/>
            </form>
        )
    }

    const throwError = () => {
        return (
            <div>
                <img src = {not_found}/>
                <p><span>Error:</span></p>
                <p>{err}</p>
            </div>
        )
    }

    return (
        <div  className='tamaño_minimo centrar dar_espacio'>
            {nombre == null ? throwError() : chargeForm()}
        </div>
    )
}

export default EditPage
