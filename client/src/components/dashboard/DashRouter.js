import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

const DashRouter = ({
  auth: { user }
}) => {

  return (
    <>
      { user && user.super_admin && <h2>Es Super Admin</h2> && <Navigate to="/dashboard" />}
      { user && !user.super_admin && <h2>Es Usuario</h2> && <Navigate to="/dashboardcustomer" />}
      { !user && <Navigate to="/login" />}
    </>
  )
}

DashRouter.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(DashRouter)
