import Axios from "axios";
import dir from './constants/api';
let gameId = 0;

const fetchUserData = (page) => {     
    try {       
        console.log (dir + page);
        const response = Axios.get(dir + page);       
        console.log('respuesta de la api', response);     
    } catch (error) {       
        console.error(error);     
    }   
};

export default fetchUserData