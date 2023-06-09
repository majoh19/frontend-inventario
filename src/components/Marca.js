import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { createMarca, editarMarca, getMarca } from '../services/MarcaService'
import ModalMarca from './ui/ModalMarca'

export default function Marca() {

  const title = 'Marca'
  const [marcas, setMarcas] = useState([])
  const [query, setQuery] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [marca, setMarca] = useState({ nombre: '' })
  const [loadingSave, setLoadingSave] = useState(false)
  const [id, setId] = useState('')

  const listMarcas = async () => {
    try {
      setLoading(true)
      setError(false)
      const { data } = await getMarca(query)
      console.log(data)
      setMarcas(data)
      setTimeout(() => { setLoading(false) }, 500)
    } catch (e) {
      console.log(e)
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => { listMarcas() }, [query])

  const changeSwitch = () => { setQuery(!query) }

  const handleChange = (e) => { setMarca({ ...marca, [e.target.name]: e.target.value }) }

  const saveMarca = async () => {
    try {
      setError(false)
      setLoadingSave(true)
      const response = await createMarca(marca)
      console.log(response)
      setMarca({ nombre: '' })
      listMarcas()
      setTimeout(() => { setLoadingSave(false) }, 500)
    } catch (e) {
      console.log(e)
      setError(true)
      setLoadingSave(false)
    }
  }

  const closeModal = () => { setMarca({ nombre: '' }) }

  const selectMarcaEquipo = (evt) => {
    evt.preventDefault()
    setId(evt.target.id)
    const brand = marcas.filter(marca => marca._id === evt.target.id)
    setMarca({ ...brand[0] })
  }

  const editMarcaEquipo = async () => {
    try {
      setError(false)
      setLoadingSave(true)
      const response = await editarMarca(id, marca)
      console.log(response)
      setMarca({ nombre: '' })
      listMarcas()
      setTimeout(() => { setLoadingSave(false) }, 500)
    } catch (e) {
      console.log(e)
      setError(true)
      setLoadingSave(false)
    }
  }

  return (
    <>
      <ModalMarca title={title} closeModal={closeModal} handleChange={handleChange} marca={marca} loadingSave={loadingSave} saveMarca={saveMarca} />
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
                    marcas.map((marcaE, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{marcaE.nombre}</td>
                          <td>{marcaE.estado ? 'Activo' : 'Inactivo'}</td>
                          <td>{dayjs(marcaE.fechaCreacion).format('DD/MM/YYYY')}</td>
                          <td>{dayjs(marcaE.fechaActualizacion).format('DD/MM/YYYY')}</td>
                          <td>
                          <button onClick={selectMarcaEquipo} type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModalEdit" id={marcas._id}>Editar</button>
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
