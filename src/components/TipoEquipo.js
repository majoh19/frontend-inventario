import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { createTipoEquipo, getTipoEquipo, editarTipoEquipo } from '../services/TipoEquipoService'
import Modal from './ui/Modal'
import ModalEdit from './ui/ModalEdit'

export default function TipoEquipo() {

    const title = 'Tipo de Equipo'
    const [tipoEquipo, setTipoEquipo] = useState([])
    const [query, setQuery] = useState(true)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [tipo, setTipo] = useState({ nombre: '' })
    const [loadingSave, setLoadingSave] = useState(false)
    const [id, setId] = useState('')

    const listTipoEquipo = async () => {
        try {
            setLoading(true)
            setError(false)
            const { data } = await getTipoEquipo(query)
            console.log(data)
            setTipoEquipo(data)
            setTimeout(() => {
                setLoading(false)
            }, 500)
        } catch (e) {
            console.log(e)
            setLoading(false)
            setError(true)
        }
    }

    useEffect(() => { listTipoEquipo() }, [query])

    const changeSwitch = () => { setQuery(!query) }

    const handleChange = (e) => { setTipo({ ...tipo, [e.target.name]: e.target.value }) }

    const saveTipoEquipo = async () => {
        try {
            setError(false)
            setLoadingSave(true)
            const response = await createTipoEquipo(tipo)
            console.log(response)
            setTipo({ nombre: '' })
            listTipoEquipo()
            setTimeout(() => {
                setLoadingSave(false)
            }, 500)
        } catch (e) {
            console.log(e)
            setError(true)
            setLoadingSave(false)
        }
    }

    const closeModal = () => { setTipo({ nombre: '' }) 
    }

    const selectTipoEquipo = (evt) => {
        evt.preventDefault()
        setId(evt.target.id)
        const tEq = tipoEquipo.filter(tipo => tipo._id === evt.target.id)
        setTipo({ ...tEq[0] })
    }

    const editTipoEquipo = async () => {
        try {
            setError(false)
            setLoadingSave(true)
            const response = await editarTipoEquipo(id, tipo)
            console.log(response)
            setTipo({ nombre: '' })
            listTipoEquipo()
            setTimeout(() => { setLoadingSave(false) }, 500)
        } catch (e) {
            console.log(e)
            setError(true)
            setLoadingSave(false)
        }
    }

    return (
        <>
            <ModalEdit title={title} closeModal={closeModal} handleChange={handleChange} tipo={tipo} loadingSave={loadingSave} editTipoEquipo={editTipoEquipo} />
            <Modal title={title} closeModal={closeModal} handleChange={handleChange} tipo={tipo} loadingSave={loadingSave} saveTipoEquipo={saveTipoEquipo} />
            <div className='form-check form-switch'>
                <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked' checked={query} onChange={changeSwitch} />
                <label className='form-check-label' htmlFor='flexSwitchCheckChecked'>Activos</label>
            </div>
            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Agregar</button>
            {
                error && (<div class="alert alert-danger" role="alert">Ha ocurrido un error</div>)
            }
            <div className='table-responsive'>
                {
                    loading
                        ? (
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        )
                        : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Fecha creacion</th>
                                        <th scope="col">Fecha actualizacion</th>
                                        <th scope="col"></th>
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
                                                    <td>{dayjs(tipoE.fechaCreacion).format('DD/MM/YYYY')}</td>
                                                    <td>{dayjs(tipoE.fechaActualizacion).format('DD/MM/YYYY')}</td>
                                                    <td>
                                                        <button onClick={selectTipoEquipo} type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModalEdit" id={tipoEquipo._id}>Editar</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                }


            </div>
        </>
    )
}
