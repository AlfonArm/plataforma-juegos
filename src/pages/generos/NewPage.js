import createData from '../../axios/createData';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import navBarComponent from '../../components/NavBarComponent';



const newPage = () => {

    function subir () {
        const pointer = document.getElementById('nombre_genero');
        if (pointer.value.length == 0) {
            pointer.innerHTML('Debe insertar un valor válido');
            alert ('Debe insertar un valor válido');
        } else {
            createData('/generos', pointer.value);
        }
    }

    return (
        <div>
            <form className="cuadro" onsubmit = "return dio_click()" method = "post">
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
                <button type = "submit" onClick={subir()}>Subir</button>
            </form>
        </div>
    )
}

export default newPage