import react, {useState, useEffect} from 'react';
import createData from '../../axios/createData';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import navBarComponent from '../../components/NavBarComponent';
import {fetchUserData} from "../../axios/fetchUserData";


const editPage = () => {
    //const params = new URLSearchParams(location.search);
    const genderId = 1//params.get('id')
    const [nombre, setName] = useState('');
    const [existe, setExists] = useState(false);
    const [err, setError] = useState('none');
    useEffect(() => setExists(exists(genderId) != -1), [])

    function exists () {
        try {
            let datos = fetchUserData('/generos').value;
            var index = datos.findIndex(function(dato) {
                return dato.id == genderId
            }); 
            if (index == null) return -1;
            setName(datos[index].nombre);
            return (datos[index].nombre)
        } catch (er) {
            // dado que no hay una funcionalidad para tomar un solo elemento, no va a devolver un error de base de datos salvo que no haya datos o algo así. Habría que poner que
            // devuelva 404 en todo caso.
            setError(er);
        }
    }

    function editar () {
        const pointer = document.getElementById('nombre_genero');
        if (pointer.value.length == 0) {
            pointer.innerHTML('Debe insertar un valor válido');
        } else {
            try {
                createData('/generos', pointer.value);
                alert('Se ha creado el nuevo género con éxito')
            } catch (er) {
                alert ('Error: '+er);
            }
        }
    }

    const chargeForm = () => {
        return (
            <form className="cuadro" onsubmit = "return dio_click()" method = "post">
                <div className = "top_form">
                    <p>Completa:</p>
                </div>
                <div className = "flex"> 
                    <fieldset>
                        <legend>Nombre</legend>
                        <input placeholder="Nombre del género" id = "nombre_genero" type='text' value={nombre}/>
                        <p id = "return_genero"></p>
                    </fieldset>
                </div>
                <button type = "submit" onClick={editar()}>Subir</button>
            </form>
        )
    }

    const throwError = () => {
        return (
            <div>
                <img src = '../../styles/not_found.png'/>
                <p><span>Error:</span></p><br></br>
                <p>{err}</p>
            </div>
        )
    }

    return (
        <div>
            <HeaderComponent/>
            <navBarComponent/>
            {exists() ? chargeForm() : throwError()}
            <FooterComponent/>
        </div>
    )
}

export default editPage
