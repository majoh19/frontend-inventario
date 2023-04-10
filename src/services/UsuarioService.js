import { axiosConfig } from "../configuration/axiosConfig"

const getUsuario = (estado) => {
    return axiosConfig.get('usuarios?estado=' + estado, {
        headers: { 'Content-Type': 'application/json' }
    })
}

const createUsuario = () => {

}

export { getUsuario, createUsuario }