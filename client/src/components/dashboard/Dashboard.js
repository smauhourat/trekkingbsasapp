import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DashboardActions from './DashboardActions'
import UsersList from './UsersList'
import TripsList from './TripsList'
import ActivitiesList from './ActivitiesList'
import AccountList from './AccountsList'
import CustomersList from './CustomersList'
import { getUsers } from '../../actions/user'
import { clearTrip } from '../../actions/trip'

const Dashboard = ({
  getUsers,
  clearTrip,
  auth: { user },
  user: { users }
}) => {
  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
      <section className='container'>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Bienvenido {user && user.name }
      </p>
      <>
        <DashboardActions />
        <TripsList />
        <ActivitiesList />
        <UsersList users={users} />
        <AccountList />
        <CustomersList />
      </>
    </section>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  clearTrip: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user
})

export default connect(mapStateToProps, { getUsers, clearTrip })(Dashboard)
