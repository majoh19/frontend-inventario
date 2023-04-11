import { axiosConfig } from "../configuration/axiosConfig"

const getMarca = (estado) => {
    return axiosConfig.get('marcas?estado=' + estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const createMarca = (data = {}) => {
    return axiosConfig.post('marcas', data, {
        headers: { 'Content-Type': 'application/json' }
    })
}

const editarMarca = (marcaId, data) => {
    return axiosConfig.put(`marcas/${marcaId}`, data, {
        headers: { 'Content-Type': 'application/json' }
    })
}

const deleteMarca = (marcaId) => {
    return axiosConfig.delete(`marcas/${marcaId}`, {}, {
        headers: { 'Content-Type': 'application/json' }
    })
}

export { getMarca, createMarca, editarMarca, deleteMarca}