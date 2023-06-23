import dir from '../constants/api';
import Axios from 'axios';

const fetchUserData = async (page, request = '') => {     
    try {
        const response = await Axios.get(dir + page, request);     
        return response
    } catch (error) {       
        console.error(error);     
    }   
};

export default fetchUserData