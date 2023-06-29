import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent'
import NavBarComponent from '../../components/NavBarComponent'
import {useState, useEffect} from 'react';
import {fetchUserData} from "../../axios/fetchUserData";
import deleteUserData from '../../axios/deleteUserData'
import api from '../../constants/api'
import form from '../../styles/form.png'
import delet from '../../styles/delete.png'

const Generos = () => {
    const [generos, setGeneros] = useState([]);
    useEffect (() => setGeneros((fetchUserData('/generos').data)), []);
//    const [pointer, setPointer] = useState(0);
    const [agregar, setAgregar] = useState();

    // lo que devuelve si la lista está vacía (implementar poner un error de ser necesario)
    const noExiste = () => {
        return (
            <div>
                <p>No hay generos</p>
            </div>
        )
    }

    // función de borrado
    function checkDependiencesAndPopUp (id, nombre = '') {
        try {
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
                <img className='access_form' src={form} onClick={() => window.location.replace('./genero/new')}/>
                <div className='mostrar_gen_plat'>
                    {((Array.isArray(generos))&&(generos.length > 0)) ?
                        generos.map ( (genero) => {
                            return (
                                <div key={genero.id}>
                                    <div className='interface'>
                                        <img className ='interface_image' src = {delet} onClick={() => checkDependiencesAndPopUp(genero.id, genero.nombre)}/>
                                    </div>
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
