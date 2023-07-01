import {useState, useEffect} from 'react';
import {fetchUserData} from "../../axios/fetchUserData";
import deleteUserData from '../../axios/deleteUserData'
import api from '../../constants/api'
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
        console.log ('Agarré el error: ' + e.message)
    }
    
    const getGeneros = async () => {
        let noEntrar = false;
        let response;
        try {
            response = await fetchUserData('/generos');
        } catch (e) {
            noEntrar = true;
            console.log('Encontre ' + e.message)
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

    function exito () {
        alert ('Se ha borrado exitosamente')
    }

    function fracaso (num, mensaje) {
        alert ('Hubo un error: ' + num + '. ' + mensaje)
    }

    // función de borrado
    async function checkDependiencesAndPopUp (id) {
        try {
            const result = deleteUserData('/generos/'+id);
            getGeneros()
            if ((result.status >= 200)&&(result.status<300)) exito(); else fracaso(result.status, result.statusText)
        } catch (error) {
            alert (error);
        }
    }

    // cuerpo de página
    return (
        <div>
            <div>
                <img className='access_form' src={form} onClick={() => window.location.replace('./generos/new')}/>
                <div className='mostrar_gen_plat lista'>
                    {((Array.isArray(generos))&&(generos.length > 0)&&(erro == "")) ?
                        generos.map ( (genero) => {
                            return (
                                <div key={genero.id} className='genplat'>
                                    <img className='basura' src = {delet} onClick={() => checkDependiencesAndPopUp(genero.id)}/>
                                    <img className='basura' src = {form} onClick={() => window.location.replace('/generos/edit/'+genero.id)}/>
                                    <p>{genero.nombre}</p>
                                </div>
                            )
                        }) : noExiste()
                    }
                </div>
            </div>
        </div>
    );
};

export default Generos;
