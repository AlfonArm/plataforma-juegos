import dir from '../constants/api';
import Axios from 'axios';

const createData = async (page, request) => {     
    try {       
        const response = await Axios.post(dir + page, request);       
        return response
    } catch (error) {       
        console.error(error);     
    }   
};

export default createData