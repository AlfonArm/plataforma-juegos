import Axios from "axios";
import dir from './constants/api';

const fetchUserData = async (page, request) => {     
    try {       
        console.log (dir + page);
        const response = await Axios.get(dir + page, request);       
        console.log('respuesta de la api', response);
        return response
    } catch (error) {       
        console.error(error);     
    }   
};

const deleteUserData = async (page, request) => {     
    try {       
        console.log (dir + page);
        const response = await Axios.delete(dir + page, request);       
        console.log('respuesta de la api', response);
        return response
    } catch (error) {       
        console.error(error);     
    }   
};

const modifyUserData = async (page, request) => {     
    try {       
        console.log (dir + page);
        const response = await Axios.put(dir + page, request);       
        console.log('respuesta de la api', response);
        return response
    } catch (error) {       
        console.error(error);     
    }   
};

const createData = async (page, request) => {     
    try {       
        console.log (dir + page);
        const response = await Axios.post(dir + page, request);       
        console.log('respuesta de la api', response);
        return response
    } catch (error) {       
        console.error(error);     
    }   
};
