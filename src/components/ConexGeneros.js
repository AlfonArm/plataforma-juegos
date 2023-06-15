import axios from 'axios';
 // Función para obtener los datos del usuario desde la API

const fetchUserData = async () => {
    try {
        const response = await
        axios.get(`generos/${generoId}`);
        console.log('respuesta de la api',response);
    } catch (error) {
        console.error(error);
    }
};
