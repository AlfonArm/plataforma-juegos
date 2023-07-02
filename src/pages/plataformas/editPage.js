import react, {useState, useEffect} from 'react';
import modifyUserData from '../../axios/modifyUserData'
import {fetchUserData} from "../../axios/fetchUserData";
import not_found from '../../styles/not_found.png'

const EditPage = () => {
    const platId = getCurrentURL().match(/\/(\d+)$/)[1];
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
            response = await fetchUserData('/plataformas');
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



    function exists (plataformas) {
        try {
            console.log(plataformas)
            console.log(Array.isArray(plataformas))
            console.log()
            if ((plataformas)&&(Array.isArray(plataformas))) {
                let existe = false;
                let i = -1;
                while ((!existe)&&(plataformas.length > i)) {
                    i++;
                    if (i in plataformas) {
                        if (plataformas[i].id == platId) {
                            existe = true;
                            if (typeof plataformas[i].nombre === 'string') console.log('encontre '+plataformas[i].nombre+' en '+plataformas[i].id)
                        }
                    }
                }
                if ((i in plataformas)&&(typeof plataformas[i].nombre === 'string')&&(existe)) {
                    return plataformas[i].nombre
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
        if (typeof document.getElementById('nombre_plataforma').value === 'string') {
            if ((document.getElementById('nombre_plataforma').value == null)||(document.getElementById('nombre_plataforma').value.length == 0)) {
                document.getElementById('return_plataforma').innerHTML = 'Debe insertar un valor válido';
            } else {
                try {
                    const result = modifyUserData('/plataformas/'+platId, {name: document.getElementById('nombre_plataforma').value});
                    alert('Se ha editado a ' + nombre)
                    window.location.replace('/plataformas');
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
                        <input placeholder="Nombre del género" id = "nombre_plataforma" type='text' value={nombre} onChange={(e) => setName(e.target.value)}/>
                        <p id = "return_plataforma"></p>
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
