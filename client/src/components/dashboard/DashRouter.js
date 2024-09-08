import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import DashboardCustomer from '../customer/DashboardCustomer'

const DashRouter = ({
  auth: { user }
}) => {

  return (
    <>
      { user && user.super_admin && <h2>Es Super Admin</h2> && <Dashboard />}
      { user && !user.super_admin && <h2>Es Usuario</h2> && <DashboardCustomer />}
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
