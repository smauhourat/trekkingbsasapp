import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import UsersList from './UsersList';
import { getUsers } from '../../actions/user';

const Dashboard = ({
    getUsers,
    auth: { user },
    user: { users }
}) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
        <>
          <DashboardActions />
          <UsersList users={users}/>
        </>
    </section>
  );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user
  });

export default connect(mapStateToProps, { getUsers })(Dashboard);
