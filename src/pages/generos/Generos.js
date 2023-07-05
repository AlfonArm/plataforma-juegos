import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {fetchUserData} from "../../axios/fetchUserData";
import deleteUserData from '../../axios/deleteUserData'
import form from '../../styles/form.png'
import delet from '../../styles/delete.png'

const Generos = () => {
    const [generos, setGeneros] = useState();
    const [erro, setError] = useState("");

    const navigate = useNavigate();

    try {
    useEffect (() => {
        if (!generos) getGeneros()
        }, []);
    } catch (e) {
        setGeneros([])
        setError (erro + '. ' + e.message)
    }
    
    const getGeneros = async () => {
        let response;
        try {
            response = await fetchUserData('/generos');
            if (typeof response === 'string') {
                throw new Error (response);
            } else {
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
                <p>No hay generos</p>
                {erro ? showError () : null}
            </div>
        )
    }

    // función de borrado
    async function checkDependiencesAndPopUp (id) {
        let response;
        try {
            response = await deleteUserData('/generos/'+id);
            if (typeof response === 'string') {
                throw new Error (response);
            } else {
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
            let dependencia = '.'
            if (e.response && e.response.status === 400) dependencia = '. Probablemente el dato está siendo usado por un juego'
            alert ('Error: ' + e.message + dependencia)
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
                <img className='access_form' src={form} onClick={() => navigate('./new')}/>
                <div className='mostrar_gen_plat lista'>
                    {((Array.isArray(generos))&&(generos.length > 0)&&(erro == "")) ?
                        generos.map ( (genero) => {
                            return (
                                <div key={genero.id} className='genplat'>
                                    <img className='basura' src = {delet} onClick={() => deleteGen(genero.id)}/>
                                    <img className='basura' src = {form} onClick={() => navigate('./edit/'+genero.id)}/>
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
