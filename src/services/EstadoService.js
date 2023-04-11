import { axiosConfig } from "../configuration/axiosConfig"

const getEstado = (estado) => {
    return axiosConfig.get('estadosequipos?estado=' + estado, {
        headers: { 'Content-Type': 'application/json' }
    })
}

const createEstado = (data = {}) => {
    return axiosConfig.post('estadosequipos', data, {
        headers: { 'Content-Type': 'application/json' }
    })
}

const editarEstado = (estadoId, data) => {
    return axiosConfig.put(`estadosequipos/${estadoId}`, data, {
        headers: { 'Content-Type': 'application/json'}
    })
}

const deleteEstado = (estadoId) => {
    return axiosConfig.delete(`estadosequipos/${estadoId}`, {}, {
        headers: { 'Content-Type': 'application/json' }
    })
}

export { getEstado, createEstado, editarEstado, deleteEstado }