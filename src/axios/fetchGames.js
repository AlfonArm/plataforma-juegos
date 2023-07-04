import dir from '../constants/api';
import Axios from 'axios';

export const fetchGames = async (page, nombre, genero, plataforma, orden) => {
    try {
        if (nombre) console.log (nombre)
        if (genero) console.log (genero)
        if (plataforma) console.log (plataforma)
        if (orden) console.log (orden)

        const response = await Axios.get(dir + page, {name: nombre, idGender: genero, idPlatform: plataforma, ascending: orden});
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
