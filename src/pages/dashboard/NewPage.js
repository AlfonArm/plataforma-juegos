import createData from "../../axios/createData";
import fetchUserData from "../../axios/fetchUserData";
import { useState, useEffect } from "react";
import { Buffer } from 'node:buffer';
import thisURL from "../../constants/thisURL";

const NewPage = () => {
const [generos, setGeneros] = useState([]);
const [plataformas, setPlataformas] = useState([]);
useEffect(() => setGeneros(fetchUserData('/generos')), []);
useEffect(() => setPlataformas(fetchUserData('/plataformas')), []);
const [err, setErr] = useState('');



    function dio_click () {
        try{
        nombre_juego = document.getElementById("nombre_juego").value;
        descripcion = document.getElementById("descripcion").value;
        url_juego = document.getElementById("url_juego").value;
        imagen = document.getElementById("imagen").value;
        plataforma = document.getElementById("plataforma").value;
        genero = document.getElementById("genero_juego").value;
        cont = 0;
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
            alert (er);
            setErr(er);
        }
    }

    function seleccionarEnviar () {
        try {
            if (dio_click()) {
                const image_data = Buffer.from(document.getElementById("imagen")[0], "uft8");
                const datos = {name: document.getElementById("nombre_juego").value, 
                type_image: document.getElementById("imagen").value, id_plataform: document.getElementById("plataforma").value, 
                description: document.getElementById("descripcion").value, url: document.getElementById("url_juego").value, 
                id_gender: document.getElementById("genero_juego").value, image: image_data};
                // revisar tema imagen
                createData ('/', datos);
                location.href (thisURL);
            }
        } catch (er) {
            alert (er);
            setErr(er);
        }
    }

    return (
        <form className="cuadro" enctype="multipart/form-data">
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
                            plataformas.map( (plataforma) => {
                                return (
                                    <option id = {plataforma.id}>{plataforma.nombre}</option>
                                )
                            })
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
                        {
                            generos.map( (genero) => {
                                return (
                                    <option id = {genero.id}>{genero.nombre}</option>
                                )
                            })
                        }
                        </select>
                        <p id = "return_genero"></p>
                    </fieldset>
                    <div>
                        <p>Seleccionar imagen</p>
                        <input type = "file" id = "imagen"/>
                        <p id = "return_imagen"> </p>
                    </div>
                </div>
            </div>
            <p></p>
            <button type = "submit" id = "confirmar" onClick={seleccionarEnviar()}>Subir</button>
        </form>
    )
}

export default NewPage;