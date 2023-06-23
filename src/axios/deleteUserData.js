import dir from '../constants/api';
import Axios from 'axios';

const deleteUserData = async (page, request) => {     
    try {       
        const response = await Axios.delete(dir + page, request);       
        return response
    } catch (error) {       
        console.error(error);     
    }   
};

export default deleteUserData