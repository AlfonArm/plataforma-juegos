import dir from '../constants/api';
import Axios from 'axios';

export const fetchGames = async (nombre, genero, plataforma, orden) => {
    try {
        let str = dir + '/juegos?';
        if (nombre && (nombre != "")) str = str + 'name='+nombre+'&';
        if (genero && (genero != "")) str = str +'idGender='+genero+'&';
        if (plataforma && (plataforma != "")) str = str +'idPlatform='+plataforma+'&';
        str = str + 'ascending='+orden;
        console.log (str);
        const response = await Axios.get(str, []);
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
