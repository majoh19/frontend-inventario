import { axiosConfig } from "../configuration/axiosConfig"

const getUsuario = (estado) => {
    return axiosConfig.get('usuarios?estado=' + estado, {
        headers: { 'Content-Type': 'application/json' }
    })
}

const createUsuario = (data = {}) => {
    return axiosConfig.post('usuarios', data, {
        headers: { 'Content-Type': 'application/json' }
    })
}

const editarUsuario = (usuarioId, data) => {
    return axiosConfig.put(`usuarios/${usuarioId}`, data, {
        headers: { 'Content-Type': 'application/json' }
    })
}

const deleteUsuario = (usuarioId) => {
    return axiosConfig.delete(`usuarios/${usuarioId}`, {}, {
        headers: { 'Content-Type': 'application/json' }
    })
}

export { getUsuario, createUsuario, editarUsuario, deleteUsuario }