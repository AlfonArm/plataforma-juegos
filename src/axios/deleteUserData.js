import dir from '../constants/api';
import Axios from 'axios';

const deleteUserData = async (page, request) => {     
    try {       
        const response = await Axios.delete (dir + page, request);       
        return Promise.resolve(response.status);
    } catch (e) {       
        return e;     
    }   
};

export default deleteUserData