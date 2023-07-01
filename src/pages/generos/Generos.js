import {useState, useEffect} from 'react';
import {fetchUserData} from "../../axios/fetchUserData";
import deleteUserData from '../../axios/deleteUserData'
import form from '../../styles/form.png'
import delet from '../../styles/delete.png'

const Generos = () => {
    const [generos, setGeneros] = useState();
    const [agregar, setAgregar] = useState();
    const [erro, setError] = useState("")

    try {
    useEffect (() => {
        if (!generos) getGeneros()
        }, []);
    } catch (e) {
        setGeneros([])
        setError (erro + '. ' + e.message)
    }
    
    const getGeneros = async () => {
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
                    setGeneros(response.data);
                } else {
                    throw new Error (response.status + ': ' + response.statusText)
                }
            } else {
                throw new Error ('No hubo respuesta')
            }
        }
    }

    const showError = () => {
        return (
            <p>{erro}</p>
        )
    }

    // lo que devuelve si la lista está vacía (implementar poner un error de ser necesario)
    const noExiste = () => {
        return (
            <div>
                <p>No hay generos</p>
                {erro ? showError () : null}
            </div>
        )
    }

    // función de borrado
    async function checkDependiencesAndPopUp (id) {
        let noEntrar = false;
        let response;
        try {
            response = await deleteUserData('/generos/'+id);
        } catch (e) {
            noEntrar = true;
            let dependencia = '.'
            if (e.response && e.response.status === 400) dependencia = '. Probablemente el dato está siendo usado por un juego'
            alert ('Error: ' + e.message + dependencia)
        }
        try {
            if (!noEntrar) {
                if (('status' in response) && ('statusText' in response)) {
                    if ((response.status >= 200)&&(response.status < 300)) {
                        alert ('Se ha borrado exitosamente');
                        getGeneros()
                    } else {
                        alert ('Hubo un error: ' + response.status + ': ' + response.statusText)
                    }
                } else {
                    alert ('No hubo respuesta')
                }
            }
        } catch (e) {
            alert ('Hubo un error: ' + e.message)
        }
    }

    function deleteGen (id) {
        try {
            checkDependiencesAndPopUp(id)
        } catch (e) {
            alert (erro)
        }
    }

    // cuerpo de página
    return (
            <div className='tamaño_minimo'>
                <img className='access_form' src={form} onClick={() => window.location.replace('./generos/new')}/>
                <div className='mostrar_gen_plat lista'>
                    {((Array.isArray(generos))&&(generos.length > 0)&&(erro == "")) ?
                        generos.map ( (genero) => {
                            return (
                                <div key={genero.id} className='genplat'>
                                    <img className='basura' src = {delet} onClick={() => deleteGen(genero.id)}/>
                                    <img className='basura' src = {form} onClick={() => window.location.replace('/generos/edit/'+genero.id)}/>
                                    <p>{genero.nombre}</p>
                                </div>
                            )
                        }) : noExiste()
                    }
                </div>
            </div>
    );
};

export default Generos;
