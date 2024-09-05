import { Outlet, Navigate } from 'react-router-dom'
import { useLocation } from 'react-router'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoutesAdmin = ({
  auth: { isAuthenticated, loading, user }
}) => {
  const location = useLocation();
  if (loading) {
    return null;
  }
  return (
    isAuthenticated && user?.super_admin ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
  )
}

PrivateRoutesAdmin.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoutesAdmin);
