import { axiosConfig } from "../configuration/axiosConfig"

const getMarca = (estado) => {
    return axiosConfig.get('marcas?estado=' + estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const createMarca = () => {

}

export {
    getMarca, createMarca
}