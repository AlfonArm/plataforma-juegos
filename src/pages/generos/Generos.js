import React, {useState} from 'react';
import Navegacion from '../../components/HeaderComponent';
import Scroll from '../scroll'

// acá habría que importar los estilos

/*
Paso a explicar un poco mi idea con respecto a cómo hacer la tabla de géneros, plataformas y, consecuentemente, de videojuegos. Después se verá su compatibilidad según
cómo se carguen los enlaces a medida que se modifique la barra de búsqueda (aspecto posible con el router-dom):
Para hacer la página un poco más llevadera e "inteligente", se me ocurrió que se pueden no cargar todos los géneros de golpe, sino ir de a bloques de 20 o 50 (que al fin y al
cabo no representan muchos dato y todo eso). A medida que bajamos, cargamos bloques.
En elem se indicaría el número de página. Es el que diría "tenés que agarrar desde x elemento de la lista a tantos más"
En lista se guardarían los datos obtenidos de la API, los cuales se importan con axios si no me equivoco
cantTotal calcula la cantidad total de elementos, dado que sino podemos llegar a cargar una página vacía si la cantidad de elementos es múltiples de la cantidad de elementos
disponibles por página.
Propongo no poner un boton de buscar, sino que se actualice solo
*/
let elem = 0;
let cantTotal = 100;
let lista = [];

// esto es algo para probar la carga de scroll, la cuál todavía no funciona. Después se pondría en la lista los
// elementos a cargar de 20 en 20.
const cargarMas = (elem) => {
    lista = [];
    for (let i = elem*20; i < (elem+1)*20; i++) lista.push(/*acá iría la función que usa axios: obtenerGeneros(i), que haría una conexión con la api*/i);
    elem++;
    return lista;
};



const Generos = () => {
    return (
        <div>
            <Navegacion></Navegacion>
            {lista = []}
            <p>Lista de géneros:</p>
            <ul>
                <div>
                {lista.map ((genero, indice) => {
                    return (
                            <li key={indice}>{genero}</li>
                    );
                    })
                }
                </div>
            </ul>
            <ul>
                {scroll() ? lista = lista + cargarMas(elem++) : null}
                {// acá tendría que haber una función que compruebe si hay más y un op terneario que mapeé 
                lista.map ((genero, indice) => {
                    return (
                            <li key={indice}>{genero}</li>
                    );
                    })
                }
            </ul>
        </div>
    );
};

export default Generos;