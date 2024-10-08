import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteUser } from '../../actions/user'

const UsersList = ({ users, deleteUser }) => {
  const usersList = users.map((user) => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>-</td>
      <td>
        <button
          onClick={() => deleteUser(user._id)}
          className='btn btn-small btn-square btn-danger'
        >
          <i className='fas fa-trash-alt' title='Eliminar' />
        </button>
      </td>
    </tr>
  ))
  return (
    <div>
      <h2 className='my-2'>Usuarios</h2>
      <div className='scroll-x'>
        <table className='table'>
          <thead>
            <tr>
              <th width='25%'>Nombre</th>
              <th width='50%' className='hide-sm'>Email</th>
              <th width='25%' className='hide-sm'>Estado</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {usersList}
          </tbody>
        </table>
      </div>
    </div>
  )
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired
}

export default connect(null, { deleteUser })(UsersList)
