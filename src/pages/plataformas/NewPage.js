import createData from '../../axios/createData';

const newPage = () => {

    const Upload = async (pointer) => {
        const result = await createData('/plataformas', {name: pointer});
        console.log(result)
        return result
    }

    function exito () {
        alert ('Se creó la plataforma con éxito. Redirigiendo a la página inicial...')
        window.location.replace('/plataformas');
    }

    function fracaso () {
        document.getElementById('return_plataforma').innerHTML= 'Hubo un error. Intente otra vez';
    }

    async function subir () {
        try {
            const pointer = document.getElementById("nombre_plataforma").value;
            if ((pointer == null)||(typeof pointer !== 'string')||(pointer.length == 0)) {
                document.getElementById('return_plataforma').innerHTML= 'Debe insertar un valor válido';
            } else {
                const result = await Upload(pointer);
                if ((result.status >= 200)&&(result.status < 300)) exito()
                else fracaso(result.status, result.statusText)
            }
        } catch (er) {
            console.log(er)
        }
    }

    return (
        <div>
            <form className="cuadro form_chiquito">
                <div className = "top_form">
                    <p>Completa:</p>
                </div>
                <div className = "flex">
                    <fieldset>
                        <legend>Nombre</legend>
                        <input placeholder="Nombre de la plataforma" id = "nombre_plataforma" type='text'/>
                        <p id = "return_plataforma"></p>
                    </fieldset>
                </div>
                <input value = "Subir" type="button" className="centro" onClick={() => subir()}/>
            </form>
        </div>
    )
}

export default newPage
