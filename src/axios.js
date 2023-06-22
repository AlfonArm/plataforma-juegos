import Axios from "axios";
import dir from './constants/api';

const fetchUserData = async (page, request) => {     
    try {       
        console.log (dir + page);
        const response = await Axios.get(dir + page, request);       
        console.log('respuesta de la api', response);
        return response
    } catch (error) {       
        console.error(error);     
    }   
};

export default fetchUserData