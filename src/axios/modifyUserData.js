import dir from '../constants/api';
import Axios from 'axios';

const modifyUserData = async (page, request) => {     
    try {       
        const response = await Axios.put(dir + page, request);       
        return Promise.resolve(response.status);
    } catch (e) {       
        return e;     
    } 
};

export default modifyUserData