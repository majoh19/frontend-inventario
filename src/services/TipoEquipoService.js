import { axiosConfig } from "../configuration/axiosConfig"

const getTipoEquipo = (estado) => {
    return axiosConfig.get('tiposequipos?estado=' + estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const createTipoEquipo = () => {


}


export {
    getTipoEquipo, createTipoEquipo
}
