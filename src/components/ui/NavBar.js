import React from 'react'
import {NavLink} from 'react-router-dom'

export default function NavBar() {
    return (
        <header className="d-flex justify-content-center py-3">

            <ul className="nav nav-pills">

                <NavLink tabIndex={1} className='nav-item nav-link' to='/'>
                    Tipo Equipo
                </NavLink>

                <NavLink tabIndex={2} className='nav-item nav-link' to='/estado'>
                    Estado
                </NavLink>

                <NavLink tabIndex={3} className='nav-item nav-link' to='/usuario'>
                    Usuario
                </NavLink>

                <NavLink tabIndex={4} className='nav-item nav-link' to='/marca'>
                    Marca
                </NavLink>

                <NavLink tabIndex={5} className='nav-item nav-link' to='/inventario'>
                    Inventario
                </NavLink>

            </ul>
        </header>
    )
}
