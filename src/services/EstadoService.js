import { axiosConfig } from "../configuration/axiosConfig"

const getEstado = (estado) => {
    return axiosConfig.get('estadosequipos?estado=' + estado, {
        headers: { 'Content-Type': 'application/json' }
    })
}

const createEstado = () => {


}


export { getEstado, createEstado }