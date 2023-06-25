import dir from '../constants/api';
import Axios from 'axios';

const modifyUserData = async (page, request) => {     
    try {       
        const response = await Axios.put(dir + page, request);       
        return response
    } catch (error) {       
        console.error(error);     
    }   
};

export default modifyUserData