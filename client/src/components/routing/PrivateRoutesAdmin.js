import { Outlet, Navigate } from 'react-router-dom'
import { useLocation } from 'react-router'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'

const PrivateRoutesAdmin = ({allowedRoles,
  auth: { isAuthenticated, loading, user }, logout
}) => {
  // console.log('allowedRoles: ', allowedRoles)
  const location = useLocation();
  if (loading) {
    return null;
  }
  
    if (isAuthenticated && 
      ((allowedRoles === "admin" && user?.super_admin) || (allowedRoles === "customer" && !user?.super_admin))
    ) {
      return (<Outlet />) 
    } else {
      //logout()
      return (<Navigate to="/login" replace state={{ from: location }} />)
    } 
 
}

PrivateRoutesAdmin.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(PrivateRoutesAdmin);
