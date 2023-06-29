import {useState, useEffect} from 'react';
import {fetchUserData} from "../../axios/fetchUserData";
import deleteUserData from '../../axios/deleteUserData'
import api from '../../constants/api'
import form from '../../styles/form.png'
import delet from '../../styles/delete.png'

const Generos = () => {
    const [generos, setGeneros] = useState();
//    const [pointer, setPointer] = useState(0);
    const [agregar, setAgregar] = useState();
    const [erro, setError] = useState("")

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
            setError(erro + '\n' + e)
        }
    }

    // lo que devuelve si la lista está vacía (implementar poner un error de ser necesario)
    const noExiste = () => {
        return (
            <div>
                <p>No hay generos</p>
            </div>
        )
    }

    // función de borrado
    function checkDependiencesAndPopUp (id) {
        try {
            console.log('/generos/'+id);
            deleteUserData('/generos/'+id);
            alert ("El elemento se ha borrado satisfactoriamente")
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
                    {((Array.isArray(generos))&&(generos.length > 0)) ?
                        generos.map ( (genero) => {
                            return (
                                <div key={genero.id} className='genplat'>
                                    <img className='basura' src = {delet} onClick={() => checkDependiencesAndPopUp(genero.id)}/>
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
