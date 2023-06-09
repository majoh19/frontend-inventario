import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { createInventario, editarInvetario, getInventario } from '../services/InventarioService'
import ModalInventario from './ui/ModalInventario'

export default function Inventario() {

  const title = 'Inventario'
  const [inventarios, setInventarios] = useState([])
  const [query, setQuery] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [inventario, setInventario] = useState({ _id:'', serial: '' })
  const [loadingSave, setLoadingSave] = useState(false)
  const [id, setId] = useState('')

  const listInventarios = async () => {
    try {
      setLoading(true)
      setError(false)
      const { data } = await getInventario(query)
      console.log(data)
      setInventarios(data)
      setTimeout(() => { setLoading(false) }, 500)
    } catch (e) {
      console.log(e)
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => { listInventarios() }, [query])

  const changeSwitch = () => { setQuery(!query) }

  const handleChange = (e) => { setInventario({ ...inventario, [e.target.name]: e.target.value }) }

  const saveInventario = async () => {
    try {
      setError(false)
      setLoadingSave(true)
      const response = await createInventario(inventario)
      console.log(response)
      setInventario({ _id:'', serial: '' })
      listInventarios()
      setTimeout(() => { setLoadingSave(false) }, 500)
    } catch (e) {
      console.log(e)
      setError(true)
      setLoadingSave(false)
    }
  }

  const closeModal = () => { setInventario({ _id:'', serial: '' }) }

  const selectInventario = (evt) => {
    evt.preventDefault()
    setId(evt.target.id)
    const invent = inventarios.filter(inventario => inventario._id === evt.target.id)
    setInventario({ ...inventario, ...invent[0] })
  }

  const editInventario = async () => {
    try {
      setError(false)
      setLoadingSave(true)
      const response = await editarInvetario(id, inventario)
      console.log(response)
      setInventario({ _id:'', serial: '' })
      listInventarios()
      setTimeout(() => { setLoadingSave(false) }, 500)
    } catch (e) {
      console.log(e)
      setError(true)
      setLoadingSave(false)
    }
  }

  return (
    <>
      <ModalInventario title={title} closeModal={closeModal} handleChange={handleChange} serial={inventario.serial} loadingSave={loadingSave} saveInventario={saveInventario} />
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
                    <th scope="col">Serial</th>
                    <th scope='col'>Modelo</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Foto</th>
                    <th scope="col">Color</th>
                    <th scope="col">Fecha compra</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Tipo</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {inventarios.map((inventario, index) => (
                    <tr key={inventario._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{inventario.serial}</td>
                      <td>{inventario.modelo}</td>
                      <td>{inventario.descripcion}</td>
                      <td><img src={inventario.foto} alt="Foto" width="50" height="50" /></td>
                      <td>{inventario.color}</td>
                      <td>{dayjs(inventario.fechaCompra).format('DD/MM/YYYY')}</td>
                      <td>{inventario.precio}</td>
                      <td>{inventario.usuario.nombre}</td>
                      <td>{inventario.marca.nombre}</td>
                      <td>{inventario.estadoEquipo.nombre}</td>
                      <td>{inventario.tipoEquipo.nombre}</td>
                      <td>
                        <button onClick={selectInventario} type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModalEdit" id={inventario._id}>Editar</button>
                      </td>
                    </tr>
                  )
                  )
                  }
                </tbody>

              </table>
            )
        }
      </div>
    </>
  )
}
