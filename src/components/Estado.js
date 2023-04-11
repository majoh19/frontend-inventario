import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { createEstado, getEstado, editarEstado } from '../services/EstadoService'
import Modal from './ui/Modal'
import ModalEdit from './ui/ModalEdit'

export default function Estado() {

  const title = 'Estado'
  const [estados, setEstados] = useState([])
  const [query, setQuery] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [estado, setEstado] = useState({ nombre: '' })
  const [loadingSave, setLoadingSave] = useState(false)
  const [id, setId] = useState('')

  const listEstados = async () => {
    try {
      setLoading(true)
      setError(false)
      const { data } = await getEstado(query)
      console.log(data)
      setEstados(data)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    } catch (e) {
      console.log(e)
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => { listEstados() }, [query])

  const changeSwitch = () => { setQuery(!query) }

  const handleChange = (e) => { setEstado({ ...estado, [e.target.name]: e.target.value }) }

  const saveEstado = async () => {
    try {
      setError(false)
      setLoadingSave(true)
      const response = await createEstado(estado)
      console.log(response)
      setEstado({ nombre: '' })
      listEstados()
      setTimeout(() => {
        setLoadingSave(false)
      }, 500)
    } catch (e) {
      console.log(e)
      setError(true)
      setLoadingSave(false)
    }
  }

  const closeModal = () => { setEstado({ nombre: '' }) }

  const selectEstadoEquipo = (evt) => {
    evt.preventDefault()
    setId(evt.target.id)
    const estE = estados.filter(estado => estado._id === evt.target.id)
    setEstado({ ...estE[0] })
  }

  const editEstadoEquipo = async () => {
    try {
      setError(false)
      setLoadingSave(true)
      const response = await editarEstado(id, estado)
      console.log(response)
      setEstado({ nombre: '' })
      listEstados()
      setTimeout(() => { setLoadingSave(false) }, 500)
    } catch (e) {
      console.log(e)
      setError(true)
      setLoadingSave(false)
    }
  }

  return (
    <>
      <ModalEdit title={title} closeModal={closeModal} handleChange={handleChange} estado={estado} loadingSave={loadingSave} editEstadoEquipo={editEstadoEquipo} />
      <Modal title={title} closeModal={closeModal} handleChange={handleChange} estado={estado} loadingSave={loadingSave} saveEstado={saveEstado} />
      <div className='form-check form-switch'>
        <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked' checked={query} onChange={changeSwitch} />
        <label className='form-check-label' htmlFor='flexSwitchCheckChecked'>Activos</label>
      </div>
      <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Agregar</button>
      {
        error && (<div className="alert alert-danger" role="alert">Ha ocurrido un error</div>)
      }
      <div className='table-responsive'>
        {
          loading
            ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
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
                    estados.map((estadoE, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{estadoE.nombre}</td>
                          <td>{estadoE.estado ? 'Activo' : 'Inactivo'}</td>
                          <td>{dayjs(estadoE.fechaCreacion).format('DD/MM/YYYY')}</td>
                          <td>{dayjs(estadoE.fechaActualizacion).format('DD/MM/YYYY')}</td>
                          <td>
                            <button onClick={selectEstadoEquipo} type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModalEdit" id={estados._id}>Editar</button>
                          </td>
                        </tr>
                      );
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
