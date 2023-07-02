import react, {useState, useEffect} from 'react';
import modifyUserData from '../../axios/modifyUserData'
import {fetchUserData} from "../../axios/fetchUserData";
import not_found from '../../styles/not_found.png'

const EditPage = () => {
    const genderId = getCurrentURL().match(/\/(\d+)$/)[1];
    const [nombre, setName] = useState();
    const [err, setError] = useState();

    try {
        useEffect (() => {
            if (!nombre) conseguirNombre()
            }, []);
    } catch (e) {
        setError (e.message)
    }

    const conseguirNombre = async () => {
        let noEntrar = false;
        let response;
        try {
            response = await fetchUserData('/generos');
        } catch (e) {
            noEntrar = true;
            setError (e.message)
        }
        if (!noEntrar) {
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

    function editar () {
        if (typeof document.getElementById('nombre_genero').value === 'string') {
            if ((document.getElementById('nombre_genero').value == null)||(document.getElementById('nombre_genero').value.length == 0)) {
                document.getElementById('return_genero').innerHTML = 'Debe insertar un valor válido';
            } else {
                try {
                    const result = modifyUserData('/generos/'+genderId, {name: document.getElementById('nombre_genero').value});
                    alert('Se ha editado a '  + nombre)
                    window.location.replace('/generos');
                } catch (er) {
                    alert (er);
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
                        <input placeholder="Nombre del género" id = "nombre_genero" type='text' value={nombre} onChange={(e) => setName(e.target.value)}/>
                        <p id = "return_genero"></p>
                    </fieldset>
                </div>
                <input type = "button" onClick={() => editar()} value="Subir"/>
            </form>
        )
    }

    function getCurrentURL () {
        return window.location.href
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
        <div  className='tamaño_minimo'>
            {nombre == null ? throwError() : chargeForm()}
        </div>
    )
}

export default EditPage
