import React from 'react'
import { Link } from 'react-router-dom'

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/add-trip' className='btn btn-light'>
        <i className='fas fa-calendar text-primary' /> Agregar Evento
      </Link>
      <Link to='/add-activity' className='btn btn-light'>
        <i className='fas fa-calendar text-primary' /> Agregar Actividad
      </Link>
      <Link to='/add-user' className='btn btn-light'>
        <i className='fas fa-user text-primary' /> Agregar Usuario
      </Link>
      <Link to='/add-account' className='btn btn-light'>
        <i className='fas fa-book text-primary' /> Agregar Cuenta Banco
      </Link>
    </div>
  )
}

export default DashboardActions
