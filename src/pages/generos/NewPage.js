import createData from '../../axios/createData';

const newPage = () => {

    const Upload = async (pointer) => {
        const result = await createData('/generos', {name: pointer});
        console.log(result)
        return result
    }

    function exito () {
        alert ('Se creó el género con éxito. Redirigiendo a la página inicial...')
        window.location.replace('/generos');
    }

    function fracaso (cod, text) {
        document.getElementById('return_genero').innerHTML= 'Hubo un error: ' + cod + ': ' + text;
    }

    async function subir () {
        try {
            const pointer = document.getElementById("nombre_genero").value;
            if ((pointer == null)||(typeof pointer !== 'string')||(pointer.length == 0)) {
                document.getElementById('return_genero').innerHTML= 'Debe insertar un valor válido';
            } else {
                const result = await Upload(pointer);
                if (typeof result === 'string') {
                    throw new Error (result);
                } else {
                    if ('status' in result) {
                        if ((result.status >= 200)&&(result.status < 300)) exito()
                        else fracaso(result.status, result.statusText)
                    } else {
                        fracaso(502, 'Respuesta inválida/no hay respuesta');
                    }
                }
            }
        } catch (er) {
            console.log(er)
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
                        <input placeholder="Nombre del género" id = "nombre_genero" type='text'/>
                        <p id = "return_genero"></p>
                    </fieldset>
                </div>
                <input value = "Subir" type="button" className="centro" onClick={() => subir()}/>
            </form>
        </div>
    )
}

export default newPage