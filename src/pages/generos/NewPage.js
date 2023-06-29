import createData from '../../axios/createData';



const newPage = () => {
// ??????
    function subir () {
        try {
            const pointer = document.getElementById("nombre_genero").value;
            if ((pointer == null)||(typeof pointer !== 'string')||(pointer.length == 0)) {
                document.getElementById('return_genero').innerHTML= 'Debe insertar un valor válido';
            } else {
                const requestPost = { nombre: pointer}
                const result = createData('/generos', {requestPost});
                if ((typeof result === 'number')&&(result == 200)) {
                    alert ('Se creó el género con éxito. Redirigiendo a la página inicial')
                    window.location.replace('/generos');
                } else {
                    document.getElementById('return_genero').innerHTML= 'Hubo un error. Intente otra vez';
                }
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