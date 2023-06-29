import react, {useState, useEffect} from 'react';
import createData from '../../axios/createData';
import {fetchUserData} from "../../axios/fetchUserData";
import not_found from '../../styles/not_found.png'

const EditPage = () => {
    const genderId = getCurrentURL().match(/\/(\d+)$/)[1];
    const [nombre, setName] = useState('');
    const [err, setError] = useState('none');
    useEffect(() => setName(exists()), [])

    function exists () {
        try {
            if (nombre == '') {
                let datos = fetchUserData('/generos').value;
                if (datos) {
                    let existe = false;
                    let i = 0;
                    while ((!existe)&&(datos.length > i)) if (datos[i++].id == genderId) existe = true;
                    if (existe)
                        return datos[i].nombre
                    else {
                        setError ('El elemento no existe');
                        return '';
                    }
                } else {
                    setError('No hay datos guardados');
                    return '';
                }
            }
        } catch (er) {
            // dado que no hay una funcionalidad para tomar un solo elemento, no va a devolver un error de base de datos salvo que no haya datos o algo así. Habría que poner que
            // devuelva 404 en todo caso.
            setError('Error: '+er);
        }
    }

    function editar () {
        const pointer = document.getElementById('nombre_genero');
        if (pointer.value.length == 0) {
            document.getElementById('return_genero').innerHTML('Debe insertar un valor válido');
        } else {
            try {
                createData('/generos', pointer.value);
                alert('Se ha creado el nuevo género con éxito')
            } catch (er) {
                alert ('Error: '+er);
            }
        }
    }

    const chargeForm = () => {
        return (
            <form className="cuadro" onsubmit = "return dio_click()" method = "post">
                <div className = "top_form">
                    <p>Completa:</p>
                </div>
                <div className = "flex"> 
                    <fieldset>
                        <legend>Nombre</legend>
                        <input placeholder="Nombre del género" id = "nombre_genero" type='text' value={nombre}/>
                        <p id = "return_genero"></p>
                    </fieldset>
                </div>
                <button type = "submit" onClick={editar()}>Subir</button>
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
        <div>
            {nombre != '' ? chargeForm() : throwError()}
        </div>
    )
}

export default EditPage
