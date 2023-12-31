import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {fetchUserData} from "../../axios/fetchUserData";
import deleteUserData from '../../axios/deleteUserData'
import form from '../../styles/form.png'
import delet from '../../styles/delete.png'

const Plataformas = () => {
    const [plataformas, setPlataformas] = useState();
    const [erro, setError] = useState("");

    const navigate = useNavigate();

    try {
        useEffect (() => {
            if (!plataformas) getPlataformas()
        }, []);
    } catch (e) {
        setPlataformas([])
        setError (erro + '. ' + e.message)
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

    const showError = () => {
        return (
            <p>{erro}</p>
        )
    }

    // lo que devuelve si la lista está vacía (implementar poner un error de ser necesario)
    const noExiste = () => {
        return (
            <div>
                <p>No hay plataformas</p>
                {erro ? showError () : null}
            </div>
        )
    }

    // función de borrado
    async function checkDependiencesAndPopUp (id) {
        let noEntrar = false;
        let response;
        try {
            response = await deleteUserData('/plataformas/'+id);
        } catch (e) {
            noEntrar = true;
            let dependencia = '.'
            if (e.response && e.response.status === 400) dependencia = '. Probablemente el dato está siendo usado por un juego'
            alert ('Error: ' + e.message + dependencia)
        }
        try {
            if (!noEntrar) {
                if (response) {
                    if (('status' in response) && ('statusText' in response)) {
                        if ((response.status >= 200)&&(response.status < 300)) {
                            alert ('Se ha borrado exitosamente');
                            getPlataformas()
                        } else {
                            alert ('Hubo un error: ' + response.status + ': ' + response.statusText)
                        }
                    } else {
                        alert ('No hubo respuesta')
                    }
                }
            }
        } catch (e) {
            alert ('Hubo un error: ' + e.message)
        }
    }

    // cuerpo de página
    return (
        <div  className='tamaño_minimo'> 
            <img className='access_form' src={form} onClick={() => navigate('./new')}/>
            <div className='mostrar_gen_plat lista'>
                {((Array.isArray(plataformas))&&(plataformas.length > 0)) ?
                    plataformas.map ( (plataforma) => {
                        return (
                            <div key={plataforma.id} className='genplat'>
                                <img className='basura' src = {delet} onClick={() => checkDependiencesAndPopUp(plataforma.id)}/>
                                <img className='basura' src = {form} onClick={() => navigate('./edit/'+plataforma.id)}/>
                                <p>{plataforma.nombre}</p>
                            </div>
                        )
                    }) : noExiste()
                }
            </div>
        </div>
    );
};

export default Plataformas;
