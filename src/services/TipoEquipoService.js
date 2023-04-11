import { axiosConfig } from "../configuration/axiosConfig"

const getTipoEquipo = (estado) => {
    return axiosConfig.get('tiposequipos?estado=' + estado, {
        headers: { 'Content-Type': 'application/json' }
    })
}

const createTipoEquipo = (data = {}) => {
    return axiosConfig.post('tiposequipos', data, {
        headers: { 'Content-Type': 'application/json' }
    })
}

const editarTipoEquipo = (tipoId, data) => {
    return axiosConfig.put(`tiposequipos/${tipoId}`, data, {
        headers: { 'Content-Type': 'application/json' }
    })
}

const deleteTipoEquipo = (tipoId) => {
    return axiosConfig.delete(`tiposequipos/${tipoId}`, {}, {
        headers: { 'Content-Type': 'application/json' }
    })
}

export { getTipoEquipo, createTipoEquipo, editarTipoEquipo, deleteTipoEquipo }
