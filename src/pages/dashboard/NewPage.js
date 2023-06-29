import createData from "../../axios/createData";
import {fetchUserData} from "../../axios/fetchUserData";
import { useState, useEffect } from "react";
import thisURL from "../../constants/thisURL";

const NewPage = () => {
    const [generos, setGeneros] = useState([]);
    const [plataformas, setPlataformas] = useState([]);
    useEffect(() => setGeneros(fetchUserData('/generos')), []);
    useEffect(() => setPlataformas(fetchUserData('/plataformas')), []);
    const [err, setErr] = useState('');
    // esto no me gusta mucho, pero no sé cómo meterle un usestate :/
    let base64String;



    function dio_click () {
        try{
            const descripcion = document.getElementById("descripcion").value;
            const nombre_juego = document.getElementById("nombre_juego").value;
            const imagen = document.getElementById("imagen").value;
            const url_juego = document.getElementById("url_juego").value;
            const genero = document.getElementById("genero_juego").value;
            const plataforma = document.getElementById("plataforma").value;
            let cont = 0;
            if ((nombre_juego == null) || (nombre_juego == "")) {
                document.getElementById("return_nombre").innerHTML = "Este campo es obligatorio";
                cont++;
            } else {
                document.getElementById("return_nombre").innerHTML = "";
            }
            if ((imagen == null) || (imagen.length == 0)) {
                document.getElementById("return_imagen").innerHTML = "Este campo es obligatorio";
                cont++;
            } else {
                let fileInput = document.getElementById('imagen');
                let filePath = fileInput.value;
                let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
                if (!allowedExtensions.exec(filePath)){
                    document.getElementById("return_imagen").innerHTML = "El archivo tiene que tener alguna de las siguientes extensiones: .jpeg/.jpg/.png/.gif";
                    cont++;
                }else
                    document.getElementById("return_imagen").innerHTML = "";
            }
            if ((descripcion == null) || (descripcion == "")) {
                document.getElementById("return_desc").innerHTML = "Este campo es obligatorio";
                cont++;
            } else {
                if (descripcion.length > 255) {
                    document.getElementById("return_desc").innerHTML = "La descripción es muy larga";
                    cont++;
               } else {
                    document.getElementById("return_desc").innerHTML = "";
                }
            }
            if (plataforma == "not_valid") {
                document.getElementById("return_plataforma").innerHTML = "Se debe elegir una opción válida";
                cont++;
            } else {
                document.getElementById("return_plataforma").innerHTML = "";
            }
            if ((url_juego == null) || (url_juego == "")) {
                document.getElementById("return_direccion").innerHTML = "Este campo es obligatorio";
                cont++;
            } else {
                if (url_juego.length > 80) {
                    document.getElementById("return_direccion").innerHTML = "El enlace es muy largo";
                    cont++;
                } else {
                    document.getElementById("return_direccion").innerHTML = "";
                }
            }
            if (genero == "not_valid") {
                document.getElementById("return_genero").innerHTML = "Se debe elegir una opción válida";
                cont++;
            } else {
                document.getElementById("return_genero").innerHTML = "";
            }
            return (cont == 0);
        } catch (er) {
            console.log (er);
            setErr(er);
        }
    }

    function imageUploaded() {
        let file = document.querySelector(
            'input[type=file]')['files'][0];
        let reader = new FileReader();
        reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
        const imageBase64Stringsep = base64String;
        }
        reader.readAsDataURL(file);
    }

    function seleccionarEnviar () {
        try {
            if (dio_click()) {
                const datos = {name: document.getElementById("nombre_juego").value,
                type_image: document.getElementById("imagen").value, id_plataform: document.getElementById("plataforma").value, 
                description: document.getElementById("descripcion").value, url: document.getElementById("url_juego").value, 
                id_gender: document.getElementById("genero_juego").value, image: base64String
                };
                // revisar tema imagen
                createData ('/', datos);
//                location.href (thisURL);
            }
        } catch (er) {
            alert (er);
            setErr (er);
        }
    }

    return (
        <form className="cuadro">
        <div className = "top_form">
            <p>Completa el siguiente formulario para subir el juego</p>
        </div>
        <div className = "flex"> 
            <div className="espacio_form">
                <fieldset>
                    <legend>Nombre</legend>
                    <input placeholder="Nombre del juego" id = "nombre_juego"/>
                    <p id = "return_nombre"></p>
                </fieldset>
                <fieldset>
                    <legend>Descripción</legend>
                    <textarea placeholder = "Hasta 255 caracteres" className = "texto_grande" id = "descripcion"></textarea>
                    <p id = "return_desc"></p>
                </fieldset>
            </div>
            <div className="espacio_form">
                <fieldset>
                    <legend>Plataforma</legend>
                    <select id = "plataforma">
                        <option id = 'not_an_option'>Seleccione una plataforma</option>
                        {
                            ((Array.isArray(plataformas))&&(plataformas.length > 0)) ? plataformas.map( (plataforma) => {
                                return (
                                    <option id = {plataforma.id}>{plataforma.nombre}</option>
                                )
                            }) : null
                        }
                    </select>
                    <p id = "return_plataforma"></p>
                </fieldset>
                <fieldset>
                    <legend>Dirección</legend>
                    <input type="url" placeholder="Máximo 80 caracteres" id = "url_juego"/>
                    <p id = "return_direccion"></p>
                </fieldset>
            </div>
            <div className="espacio_form">
                <fieldset>
                    <legend>Género:</legend>
                        <select id = "genero_juego">
                            <option id = 'not_an_option'>Seleccione un genero</option>
                            {
                                ((Array.isArray(generos))&&(generos.length > 0)) ? generos.map( (genero) => {
                                    return (
                                        <option id = {genero.id}>{genero.nombre}</option>
                                    )
                                }) : null
                            }
                        </select>
                        <p id = "return_genero"></p>
                    </fieldset>
                    <div>
                        <p>Seleccionar imagen</p>
                        <input type = "file" id = "imagen" onChange={imageUploaded()}/>
                        <p id = "return_imagen"> </p>
                    </div>
                </div>
            </div>
            <p></p>
            <button type = "submit" id = "confirmar" onClick={() => seleccionarEnviar()}>Subir</button>
        </form>
    )
}

export default NewPage;
