function cargarGeneros () {
    let aux = [];
    for (let i = 1; i < 80; i++) aux.push(/*acá iría la función que usa axios: obtenerGeneros(i), que haría una conexión con la api*/i);
    return aux;
};

export default cargarGeneros;