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

  const usersList = [];
  // const usersList = users.map((item) => (
  //   <tr key={item.id}>
  //     <td>{item.name}</td>
  //   </tr>
  // ))

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
        <>
          <DashboardActions />
          <UsersList users={users}/>
          
            {/* {users.length}   */}
          
        </>
    </section>
  );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired
    //users: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user
  });

export default connect(mapStateToProps, { getUsers })(Dashboard);
