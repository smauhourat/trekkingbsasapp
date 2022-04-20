import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { deleteUser } from '../../actions/user';
//import formatDate from '../../utils/formatDate';

const UsersList = ({ users }) => {
  const usersList = users.map((user) => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>-</td>
    </tr>
  ))
  return (
    <div>
      <h2 class="my-2">Usuarios</h2>
      <table class="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th class="hide-sm">Email</th>
              <th class="hide-sm">Estado</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersList}
          </tbody>
        </table>
    </div>
  )
  
}

UsersList.propTypes = {
    users: PropTypes.array.isRequired,
    deleteUser: PropTypes.func.isRequired
}

export default connect(null, { deleteUser })(UsersList);