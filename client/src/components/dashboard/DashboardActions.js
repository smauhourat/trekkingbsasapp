import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/add-trip' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Agregar Evento
      </Link>
      <Link to='/add-user' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary' /> Agregar Usuario
      </Link>
    </div>
  );
};

export default DashboardActions;
