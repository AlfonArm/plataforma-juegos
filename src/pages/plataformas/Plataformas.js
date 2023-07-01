import {useState, useEffect} from 'react';
import {fetchUserData} from "../../axios/fetchUserData";
import deleteUserData from '../../axios/deleteUserData'
import api from '../../constants/api'
import form from '../../styles/form.png'
import delet from '../../styles/delete.png'

const Plataformas = () => {
    const [plataformas, setPlataformas] = useState();
    const [agregar, setAgregar] = useState();
    const [erro, setError] = useState("")

    useEffect (() => {
        if (!plataformas) setPlataformas()
    }, []);

    const getPlataformas = async () => {
        try {
            const data = await fetchUserData('/plataformas');
            if (data) {
                setPlataformas(data);
            }
        } catch (e) {
            setError(erro + '\n' + e)
        }
    }

    // lo que devuelve si la lista está vacía (implementar poner un error de ser necesario)
    const noExiste = () => {
        return (
            <div>
                <p>No hay plataformas</p>
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
            const result = deleteUserData('/plataformas/'+id);
            getPlataformas()
            if ((result.status >= 200)&&(result.status<300)) exito(); else fracaso(result.status, result.statusText)
        } catch (error) {
            alert (error);
        }
    }

    // cuerpo de página
    return (
        <div>
            <div>
                <img className='access_form' src={form} onClick={() => window.location.replace('./plataformas/new')}/>
                <div className='mostrar_gen_plat lista'>
                    {((Array.isArray(plataformas))&&(plataformas.length > 0)) ?
                        plataformas.map ( (plataforma) => {
                            return (
                                <div key={plataforma.id} className='genplat'>
                                    <img className='basura' src = {delet} onClick={() => checkDependiencesAndPopUp(plataforma.id)}/>
                                    <img className='basura' src = {form} onClick={() => window.location.replace('/plataformas/edit/'+plataforma.id)}/>
                                    <p>{plataforma.nombre}</p>
                                </div>
                            )
                        }) : noExiste()
                    }
                </div>
            </div>
        </div>
    );
};

export default Plataformas;
