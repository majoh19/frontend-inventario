import React from 'react'

export default function ModalInventario({
    title, closeModal, handleChange, inventario, loadingSave, saveInventario
}) {
    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo {title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label"> Serial </label>
                                <input type="text" className="form-control" id="recipient-name" name="serial" onChange={handleChange} value={inventario?.serial} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label"> Modelo </label>
                                <input type="text" className="form-control" id="recipient-name" name="modelo" onChange={handleChange} value={inventario?.modelo} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label"> Descripción </label>
                                <input type="text" className="form-control" id="recipient-name" name="descripcion" onChange={handleChange} value={inventario?.descripcion} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label"> Foto </label>
                                <input type="text" className="form-control" id="recipient-name" name="foto" onChange={handleChange} value={inventario?.foto} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label"> Color </label>
                                <input type="text" className="form-control" id="recipient-name" name="color" onChange={handleChange} value={inventario?.color} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label"> Fecha de Compra </label>
                                <input type="date" className="form-control" id="recipient-name" name="fecha-de-compra" onChange={handleChange} value={inventario?.fechaCompra} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label"> Precio </label>
                                <input type="number" className="form-control" id="recipient-name" name="precio" onChange={handleChange} value={inventario?.precio} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label"> Usuario </label>
                                <input type="text" className="form-control" id="recipient-name" name="usuario" onChange={handleChange} value={inventario?.usuario?.nombre} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label"> Marca </label>
                                <input type="text" className="form-control" id="recipient-name" name="marca" onChange={handleChange} value={inventario?.marca?.nombre} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label"> Estado </label>
                                <input type="text" className="form-control" id="recipient-name" name="estado" onChange={handleChange} value={inventario?.estadoEquipo?.nombre} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label"> Tipo </label>
                                <input type="text" className="form-control" id="recipient-name" name="tipo" onChange={handleChange} value={inventario?.tipoEquipo?.nombre} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Cerrar</button>
                        {loadingSave ? (
                            <button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Guardando...
                            </button>
                        ) : (
                            <button type="button" className="btn btn-primary" onClick={saveInventario} disabled={inventario?.serial?.length === 0}>Enviar</button>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}