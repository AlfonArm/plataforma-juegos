import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import createData from '../../axios/createData';

const NewPage = () => {
    const navigate = useNavigate();
    const respuestaRef = useRef(null);
    const nombreRef = useRef(null);

    const Upload = async (pointer) => {
        const result = await createData('/generos', {name: pointer});
        console.log(result)
        return result
    }

    function Exito () {
        alert ('Se creó el género con éxito. Redirigiendo a la página inicial...');
        navigate('/generos');
    }

    function fracaso (cod, text, respuesta) {
        respuesta.textContent = 'Hubo un error: ' + cod + ': ' + text;
    }

    async function Subir () {
        const nombre = nombreRef.current.value;
        const respuesta = respuestaRef.current;
        try {
            if ((nombre == null)||(typeof nombre !== 'string')||(nombre.length == 0)) {
                respuesta.textContent = 'Debe insertar un valor válido';
            } else {
                const result = await Upload(nombre);
                if (typeof result === 'string') {
                    throw new Error (result);
                } else {
                    if ('status' in result) {
                        if ((result.status >= 200)&&(result.status < 300)) Exito()
                        else fracaso(result.status, result.statusText, respuesta)
                    } else {
                        fracaso(502, 'Respuesta inválida/no hay respuesta');
                    }
                }
            }
        } catch (er) {
            respuesta.textContent = er.message;
        }
    }

    return (
        <div  className='tamaño_minimo'>
            <form className="cuadro form_chiquito">
                <div className = "top_form">
                    <p>Completa:</p>
                </div>
                <div className = "flex"> 
                    <fieldset>
                        <legend>Nombre</legend>
                        <input placeholder="Nombre del género" ref = {nombreRef} type='text'/>
                        <p ref = {respuestaRef}></p>
                    </fieldset>
                </div>
                <input value = "Subir" type="button" className="centro" onClick={() => Subir()}/>
            </form>
        </div>
    )
}

export default NewPage