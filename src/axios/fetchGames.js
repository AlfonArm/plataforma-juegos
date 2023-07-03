import dir from '../constants/api';
import Axios from 'axios';

export const fetchGames = async (page, nombre, genero, plataforma, orden) => {
    try {
        const response = await Axios.get(dir + page, {name: nombre, idGender: genero, idPlataform: plataforma, ascending: orden == 'ascending'});
        console.log (response.data)
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                resolve(response)
            }, 1000);
        })
    } catch (e) {
        return (e.message);
    }
}
