import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import UsersList from './UsersList';
import TripsList from './TripsList';
import { getUsers } from '../../actions/user';
import { getTrips } from '../../actions/trip';

const Dashboard = ({
    getUsers,
    auth: { user },
    user: { users },
    getTrips,
    trip: { trips }
}) => {
  useEffect(() => {
    getUsers();
    getTrips('')
  }, [getUsers, getTrips]);

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Bienvenido {user && user.name}
      </p>
        <>
          <DashboardActions />
          <UsersList users={users}/>
          <TripsList trips={trips}/>
        </>
    </section>
  );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    trip: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
    getTrips: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    trip: state.trip
  });

export default connect(mapStateToProps, { getUsers, getTrips })(Dashboard);
