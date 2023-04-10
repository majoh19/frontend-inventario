import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from '../components/ui/NavBar'
import Footer from '../components/ui/Footer'
import NotFound from '../components/ui/NotFound'
import TipoEquipo from '../components/TipoEquipo'
import Estado from '../components/Estado'
import Marca from '../components/Marca'
import Usuario from '../components/Usuario'
import Inventario from '../components/Inventario'

export default function AppRouters() {
    return (
        <div>
            <NavBar />
            <div className='container'>
                <Routes>
                    <Route path='/' element={<TipoEquipo />} />
                    <Route path='/estado' element={<Estado />} />
                    <Route path='/marca' element={<Marca />} />
                    <Route path='/usuario' element={<Usuario />} />
                    <Route path='/inventario' element={<Inventario />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}
