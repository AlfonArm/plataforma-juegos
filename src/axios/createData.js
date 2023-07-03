import dir from '../constants/api';
import Axios from 'axios';

const createData = async (page, request) => {     
    try {       
        const response = await Axios.post(dir + page, request);   
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                resolve(response)
            }, 1000);
        })
    } catch (e) {       
        return (e.message);
    }   
};

export default createData