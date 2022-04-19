import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';

const Dashboard = ({
    auth: { user }
}) => {
  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
        <>
          <DashboardActions />
        </>
    </section>
  );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
  });

export default connect(mapStateToProps, { })(
    Dashboard
);
