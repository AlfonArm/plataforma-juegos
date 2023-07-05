import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import createData from '../../axios/createData';

const NewPage = () => {
    const navigate = useNavigate();
    const respuestaRef = useRef(null);
    const nombreRef = useRef(null);

    const Upload = async (pointer) => {
        const result = await createData('/plataformas', {name: pointer});
        console.log(result)
        return result
    }

    function exito () {
        alert ('Se creó la plataforma con éxito. Redirigiendo a la página inicial...')
        navigate('/plataformas');
    }

    function fracaso (cod, text, respuesta) {
        respuesta.textContent = 'Hubo un error: ' + cod + ': ' + text;
    }

    async function subir () {
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
                        if ((result.status >= 200)&&(result.status < 300)) exito()
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
                        <input placeholder="Nombre de la plataforma" ref = {nombreRef} type='text'/>
                        <p ref = {respuestaRef}></p>
                    </fieldset>
                </div>
                <input value = "Subir" type="button" className="centro" onClick={() => subir()}/>
            </form>
        </div>
    )
}

export default NewPage
