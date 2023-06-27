import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent'
import NavBarComponent from '../../components/NavBarComponent'
import {useState, useEffect} from 'react';
import {fetchUserData} from "../../axios/fetchUserData";
import deleteUserData from '../../axios/deleteUserData'
import api from '../../constants/api'

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

    function redirigir () {
        return null;
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
            <HeaderComponent/>
            <NavBarComponent/>
            <div>
                <img src='../../styles/form.png' onClick={redirigir()}/>
                {console.log('Respuesta: '+generos+'. Datos: '+generos.data+'. Status: '+generos.status)}
                {((generos === null)&&(Array.isArray(generos))&&(generos.length > 0)) ? noExiste() :
                    generos.map ( (genero) => {
                        return (
                            <div key={genero.id}>
                                <div className='interface'>
                                    <img className ='interface_image' src = '../../styles/delete' onClick={checkDependiencesAndPopUp(genero.id, genero.nombre)}/>
                                </div>
                                <p>{genero.nombre}</p>
                            </div>
                        )
                    })
                }
            </div>
            <FooterComponent/>
        </div>
    );
};

export default Generos;
