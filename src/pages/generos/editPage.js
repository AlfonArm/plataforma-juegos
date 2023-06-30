import react, {useState, useEffect} from 'react';
import modifyUserData from '../../axios/modifyUserData'
import {fetchUserData} from "../../axios/fetchUserData";
import not_found from '../../styles/not_found.png'

const EditPage = () => {
    const genderId = getCurrentURL().match(/\/(\d+)$/)[1];
    const [generos, setGeneros] = useState();

    useEffect (() => {
        if (!generos) getGeneros()
        }, []);
    
    const getGeneros = async () => {
        try {
            const data = await fetchUserData('/generos');
            if (data) {
                setGeneros(data);
            }
        } catch (e) {
            setError(err + '\n' + e)
        }
    }

    const [nombre, setName] = useState();
    const [err, setError] = useState();

    useEffect(() => setName(exists(generos)))

    function exists (a) {
        try {
                if ((a)&&(Array.isArray(a))) {
                    let existe = false;
                    let i = 0;
                    while ((!existe)&&(a.length > i)) {
                        i++;
                        if (i in a) {
                            if (a[i].id == genderId) {
                                existe = true;
                                if (typeof a[i].nombre === 'string') console.log('encontre'+a[i].nombre+' en '+a[i].id)
                            }
                        }
                    }
                    if ((i in a)&&(typeof a[i].nombre === 'string')&&(existe)) {
                        return a[i].nombre
                    } else {
                        setError ('El elemento no existe');
                        }
                } else {
                    setError('No hay datos guardados');
                }
        } catch (er) {
            // dado que no hay una funcionalidad para tomar un solo elemento, no va a devolver un error de base de datos salvo que no haya datos o algo así. Habría que poner que
            // devuelva 404 en todo caso.
            setError(er);
        }
    }

    function editar () {
        if (typeof document.getElementById('nombre_genero').value === 'string') {
            if ((document.getElementById('nombre_genero').value == null)||(document.getElementById('nombre_genero').value.length == 0)) {
                document.getElementById('return_genero').innerHTML = 'Debe insertar un valor válido';
            } else {
                try {
                    const result = modifyUserData('/generos/'+genderId, {name: document.getElementById('nombre_genero').value}); // si no qué recibiría?
                    alert('Se ha editado')
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
                        <p>Nombre anterior: {nombre}</p>
                        <input placeholder="Nombre del género" id = "nombre_genero" type='text'/>
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
        <div>
            {nombre == null ? throwError() : chargeForm()}
        </div>
    )
}

export default EditPage
