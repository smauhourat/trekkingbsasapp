import { Outlet, Navigate } from 'react-router-dom'
import { useLocation } from 'react-router'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const RequireAuth = ({allowedRoles,
  auth: { isAuthenticated, isAdmin, loading, user }
}) => {
  // console.log('isAuthenticated: ', isAuthenticated)
  // console.log('isAdmin: ', isAdmin)
  // console.log('allowedRoles: ', allowedRoles)
  const location = useLocation();
  if (loading) {
    return null;
  }

  return (
    isAuthenticated && ((allowedRoles === "admin" && user?.super_admin) || (allowedRoles === "customer" && !user?.super_admin)) 
      ? <Outlet /> 
      : isAuthenticated 
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  )
}

RequireAuth.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(RequireAuth);
