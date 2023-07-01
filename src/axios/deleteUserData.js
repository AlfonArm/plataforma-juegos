import dir from '../constants/api';
import Axios from 'axios';

const deleteUserData = async (page, request) => {          
    const response = await Axios.delete (dir + page, request);       
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(response)
        }, 1000);
    })
}

export default deleteUserData