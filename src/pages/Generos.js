import React, {useState} from 'react';
import Navegacion from '../components/Navegacion';
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
let lista2 = [];
let lista3 = [];
let execute;

const cargarMas = (elem) => {
    lista = [];
    for (let i = elem*20; i < (elem+1)*20; i++) lista.push(/*acá iría la función que usa axios: obtenerGeneros(i), que haría una conexión con la api*/i);
    elem++;
    return [lista, elem];
};

const scroll = () => {
    window.addEventListener('scroll', function() {
        // Obtener la altura total del documento, incluyendo el desplazamiento vertical
        var documentHeight = document.documentElement.scrollHeight;
      
        // Obtener la altura visible de la ventana del navegador
        var windowHeight = window.innerHeight;
      
        // Obtener la posición actual del desplazamiento vertical
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
        // Calcular la distancia restante para llegar al final de la página
        var remainingDistance = documentHeight - (windowHeight + scrollTop);
      
        // Verificar si se ha llegado al final de la página
        if (remainingDistance <= 0) {
          // Aquí puedes realizar las acciones que desees cuando se llegue al final de la página
          return true
        } else {
            return false
        }
      });
}

const chargeData = () => {
    return (
            <div>
                <br></br>
                <li key={indice}>{genero}</li>
                <br></br>
            </div>
    ) 
}

const listaUpdate = (lista, elem) => {
        let lista2;
        lista2 = cargarMas(elem++);
        // esto si lista es una variable con globalidad, cosa que no es :P
        lista = lista + lista2;
        return chargeData();
};

const Generos = () => {
    const [nombre, setName] = useState("");
    
    const changeName = (newName) => {
        setName(newName);
    };

    return (
        <div>
            <Navegacion></Navegacion>
            {lista = []}
            <div>
                <input type='text' onChange={e => changeName(e.target.value)}/>
                <p className = {nombre.length == 0 ? "invisible" : "bloque"}>Mostrando resultados para: {nombre}</p>
            </div>
            <p>Lista de géneros:</p>
            {listaUpdate(lista, elem)}
            <ul>
                {scroll() ? listaUpdate(lista, elem): null}
            </ul>
        </div>
    );
};

export default Generos;