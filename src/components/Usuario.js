import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { createUsuario, getUsuario } from '../services/UsuarioService'
import Modal from './ui/Modal'

export default function Usuario() {

  const title = 'Usuario'
  const [usuarios, setUsuarios] = useState([])
  const [query, setQuery] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [usuario, setUsuario] = useState({ nombre: '' })
  const [loadingSave, setLoadingSave] = useState(false)

  const listUsuarios = async () => {
    try {
      setLoading(true)
      setError(false)
      const { data } = await getUsuario(query)
      console.log(data)
      setUsuarios(data)
      setTimeout(() => { setLoading(false) }, 500)
    } catch (e) {
      console.log(e)
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => { listUsuarios() }, [query])

  const changeSwitch = () => { setQuery(!query) }

  const handleChange = (e) => { setUsuario({ ...usuario, [e.target.name]: e.target.value }) }

  const saveUsuario = async () => {
    try {
      setError(false)
      setLoadingSave(true)
      const response = await createUsuario(usuario)
      console.log(response)
      setUsuario({ nombre: '' })
      listUsuarios()
      setTimeout(() => { setLoadingSave(false) }, 500)
    } catch (e) {
      console.log(e)
      setError(true)
      setLoadingSave(false)
    }
  }

  const closeModal = () => { setUsuario({ nombre: '' }) }

  return (
    <>
    <Modal title={title} closeModal={closeModal} handleChange={handleChange} usuario={usuario} loadingSave={loadingSave} saveUsuario={saveUsuario} />
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
                    <th scope='col'>Email</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Fecha creacion</th>
                    <th scope="col">Fecha actualizacion</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    usuarios.map((usuario, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{usuario.nombre}</td>
                          <td>{usuario.email}</td>
                          <td>{usuario.estado ? 'Activo' : 'Inactivo'}</td>
                          <td>{dayjs(usuario.fechaCreacion).format('DD/MM/YYYY')}</td>
                          <td>{dayjs(usuario.fechaActualizacion).format('DD/MM/YYYY')}</td>
                          <td>
                            <button type="button" className="btn btn-outline-primary btn-sm">Editar</button>
                            <button type="button" className="btn btn-outline-danger btn-sm">Eliminar</button>
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
