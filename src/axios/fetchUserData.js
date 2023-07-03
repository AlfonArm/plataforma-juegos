import dir from '../constants/api';
import Axios from 'axios';

export const fetchUserData = async (page, request) => {
    try {
        const response = await Axios.get(dir + page, request);
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                resolve(response)
            }, 1000);
        })
    } catch (e) {
        return (e.message);
    }
}
