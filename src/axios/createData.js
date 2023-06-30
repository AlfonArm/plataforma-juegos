import dir from '../constants/api';
import Axios from 'axios';

const createData = async (page, request) => {     
    try {       
        const response = await Axios.post(dir + page, request);   
        return Promise.resolve(response.status);
    } catch (e) {       
        return e;     
    }   
};

export default createData