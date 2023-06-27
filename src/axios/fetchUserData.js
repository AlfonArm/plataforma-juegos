import dir from '../constants/api';
import Axios from 'axios';

export const fetchUserData = async (page, request = '') => {
    try {
        debugger;
        const response = await Axios.get(dir + page, request);     
        return response.data
    } catch (error) {       
        console.error(error);     
    }   
}
