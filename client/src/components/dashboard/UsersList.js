import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { deleteUser } from '../../actions/user';

const UsersList = props => {
  return (
    <div>
      
    </div>
  )
  
}

UsersList.propTypes = {
    user: PropTypes.array.isRequired,
    deleteUser: PropTypes.func.isRequired
}

export default connect(null, { deleteUser })(UsersList);