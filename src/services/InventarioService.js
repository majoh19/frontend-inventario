import { axiosConfig } from "../configuration/axiosConfig"

const getInventario = (estado) => {
    return axiosConfig.get('inventarios?estado=' + estado, {
        headers: { 'Content-Type': 'application/json' }
    })
}

const createInventario = () => {

}

export { createInventario, getInventario }