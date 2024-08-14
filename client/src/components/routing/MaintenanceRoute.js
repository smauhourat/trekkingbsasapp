import React from 'react'
import { Navigate } from 'react-router-dom'

const MaintenanceRoute = ({
  component: Component
}) => {
  if (process.env.REACT_APP_ISMAINTENANCE === 'false') return <Component />

  return <Navigate to='/maintenance' />
}

export default MaintenanceRoute
