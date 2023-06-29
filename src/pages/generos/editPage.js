import react, {UseState, UseEffect} from 'react';
import createData from '../../axios/createData';
import {fetchUserData} from "../../axios/fetchUserData";


const editPage = () => {
    // ¿Cómo accedo la url? const params = new URLSearchParams(location.search);
    const genderId = 1 //params.get('id')
    const [nombre, setName] = UseState('');
    const [err, setError] = UseState('none');
    UseEffect(() => setName(exists()), [])

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

    const throwError = () => {
        return (
            <div>
                <img src = '../../styles/not_found.png'/>
                <p><span>Error:</span></p><br></br>
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

export default editPage
