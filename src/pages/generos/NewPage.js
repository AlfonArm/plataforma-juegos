import createData from '../../axios/createData';



const newPage = () => {
// ??????
    function subir () {
        try {
            const pointer = document.getElementById("nombre_genero").value;
            if (pointer.length == 0) {
                document.getElementById('return_genero').innerHTML('Debe insertar un valor válido');
                alert ('Debe insertar un valor válido');
            } else {
                createData('/generos', pointer);
                // algo que verifique que se subió
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
                <button className="centro" onClick={subir()}>Subir</button>
            </form>
        </div>
    )
}

export default newPage