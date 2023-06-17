import Navegacion from '../../components/HeaderComponent';
import Scroll from '../scroll'
import Mapear from '../../components/Mapear'
import cargarGeneros from './cargarGeneros';
import Axios from '../../axios'

// https://www.youtube.com/watch?v=m5yS-RsKGTw&ab_channel=FalconMasters

/*
Paso a explicar un poco mi idea con respecto a cómo hacer la tabla de géneros, plataformas y, consecuentemente, de videojuegos. Después se verá su compatibilidad según
cómo se carguen los enlaces a medida que se modifique la barra de búsqueda (aspecto posible con el router-dom):
Para hacer la página un poco más llevadera e "inteligente", se me ocurrió que se pueden no cargar todos los géneros de golpe, sino ir de a bloques de 20 o 50 (que al fin y al
cabo no representan muchos dato y todo eso). A medida que bajamos, cargamos bloques.
En listaCompleta se guardarían los datos obtenidos de la API, los cuales se importan con axios si no me equivoco
En lista voy a guardar los datos a mostrar, los cuales van a ser definidos por un contador
Propongo no poner un boton de buscar, sino que se actualice solo
*/
let listaCompleta = cargarGeneros();
let paginado = 1;
let tipo = "genero"


// esto es algo para probar la carga de scroll, la cuál todavía no funciona. Después se pondría en la lista los
// elementos a cargar de 20 en 20.

const conseguirUltimo = () => {
    const generosMostrados = document.querySelectorAll('.genero');
    console.log(generosMostrados);
    let ultimoGenero = generosMostrados[generosMostrados.length-1];
    return ultimoGenero;
}



const Generos = () => {
    return (
        <div>
            {Axios()}
            <Navegacion></Navegacion>
            <p>Lista de géneros:</p>
            <ul>
            <div>
                {Mapear(tipo, listaCompleta)}
            </div>
            </ul>
            <ul>
                {
                /*Observador.observe(ultElem) ? Mapear("genero", listaCompleta.slice[20*paginado++, 20*paginado-1]) : null
                lo que debería pasar acá es que la el primer mapeo sea de 20 páginas y aumente el paginado.
                Por alguna razón no se envía si no es la lista completa, pero bueno.
                Se me ocurre que simplemente podemos enviar la función de mapear 20 elementos con una lista de
                20 elementos al observador, que ejecutaría tales operaciones.
                
                */
                }
            </ul>
        </div>
    );
};

export default Generos;