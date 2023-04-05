import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import NavBar from './ui/NavBar'
import Footer from './ui/Footer'
import { getTipoEquipo } from '../services/TipoEquipoService'

export default function TipoEquipo({ title }) {

    const [tipoEquipo, setTipoEquipo] = useState([])

    const listTipoEquipo = async () => {
        try {
            const { data } = await getTipoEquipo(true)
            console.log(data)
            setTipoEquipo(data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        listTipoEquipo()
    }, [])

    return (
        <>
            <NavBar />
            <div className='table-responsive'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Fecha creac.</th>
                            <th scope="col">Fecha act.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tipoEquipo.map((tipoE, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{tipoE.nombre}</td>
                                        <td>{tipoE.estado ? 'Activo' : 'Inactivo'}</td>
                                        <td>{dayjs(tipoE.fechaCreacion).format('YYYY-MM-DD')}</td>
                                        <td>{dayjs(tipoE.fechaActualizacion).format('YYYY-MM-DD')}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    )
}
