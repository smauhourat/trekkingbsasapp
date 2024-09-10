import { Outlet, Navigate } from 'react-router-dom'
import { useLocation } from 'react-router'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const RequireAuth = ({allowedRoles,
  auth: { isAuthenticated, loading, user }
}) => {
  // console.log('allowedRoles: ', allowedRoles)
  const location = useLocation();
  if (loading) {
    return null;
  }
  return (
    isAuthenticated && ((allowedRoles === "admin" && user?.super_admin) || (allowedRoles !== "admin")) ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
  )
}

RequireAuth.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(RequireAuth);
