import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Menubar = ({ auth: { isAuthenticated, isAdmin, user }, logout }) => {

  if (isAuthenticated) {
    return (
      <nav className='menubar bg-dark'>
        <ul>
          {!isAdmin && (<>
            <li><Link to='/books'>Mis Reservas</Link></li>
            <li><Link to='/customer'>Mis Datos</Link></li>
            </>
          )
          }
          <li>{user?.name}</li>
        </ul>
      </nav>
    ) 
  }
}

Menubar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Menubar)
