import { axiosConfig } from "../configuration/axiosConfig"

const getInventario = (estado) => {
    return axiosConfig.get('inventarios?estado=' + estado, {
        headers: { 'Content-Type': 'application/json' }
    })
}

const createInventario = (data = {}) => {
    return axiosConfig.post('inventarios', data, {
        headers: { 'Content-Type': 'application/json' }
    })
}

const editarInvetario = (inventarioId, data) => {
    return axiosConfig.put(`inventarios/${inventarioId}`, data, {
        headers: { 'Content-Type': 'application/json' }
    })
}

const deleteInventario = (inventarioId) => {
    return axiosConfig.delete(`inventarios/${inventarioId}`, {}, {
        headers: { 'Content-Type': 'application/json' }
    })
}

export { getInventario, createInventario, editarInvetario, deleteInventario }