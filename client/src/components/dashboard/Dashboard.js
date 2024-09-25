import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DashboardActions from './DashboardActions'
import UsersList from './UsersList'
import TripsList from './TripsList'
import AccountList from './AccountsList'
import { getUsers } from '../../actions/user'
import { clearTrip } from '../../actions/trip'
import { Link } from 'react-router-dom';

const Dashboard = ({
  getUsers,
  clearTrip,
  auth: { user },
  user: { users }
}) => {
  useEffect(() => {
    getUsers()
    //clearTrip()
  }, [getUsers])

  // console.log(JSON.stringify(user))

  return (
      <section className='container'>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Bienvenido {user && user.name }
        {user?.super_admin ? " ISADMIN": ""}
      </p>
      <>
        <DashboardActions />
        <TripsList />
        <UsersList users={users} />
        <AccountList />
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
