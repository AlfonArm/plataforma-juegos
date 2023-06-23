import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent'
import GeneroDelete from "./GeneroDelete";
import GeneroModify from "./GeneroModify";
import navBarComponent from '../../components/NavBarComponent'
import {useState, useEffect} from 'react';
import fetchUserData from '../../axios/fetchUserData'
import deleteUserData from '../../axios/deleteUserData'
import modifyUserData from '../../axios/modifyUserData'
import createData from '../../axios/createData'

const Generos = () => {
    const [generos, setGeneros] = useState([]);
    const [modificando, changeModify] = useState(false);
    useEffect (() => setGeneros((fetchUserData('/generos').data)), []);


    const noExiste = () => {
        return (
            <div>
                <p>No existe</p>
            </div>
        )
    }

    function checkDependiencesAndPopUp (id) {
        try {
            deleteUserData('/generos/'+id);
            alert ("El elemento se ha borrado satisfactoriamente")
        } catch (error) {
            alert (error);
        }
    }

    return (
        <div>
            <HeaderComponent/>
            <navBarComponent/>
            <div>
                {console.log('Respuesta: '+generos+'. Datos: '+generos.data+'. Status: '+generos.status)}
                {((generos === null)&&(Array.isArray(generos))&&(generos.length > 0)) ? noExiste() :
                    generos.map ( (genero) => {
                        return (
                            <div key={genero.id}>
                                <div className='interface'>
                                    <img class ='interface_image' src = '../../styles/modify' onClick={modificando ? changeModify(false) : changeModify(true)}/>
                                    <img class ='interface_image' src = '../../styles/delete' onClick={checkDependiencesAndPopUp(genero.id)}/>
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