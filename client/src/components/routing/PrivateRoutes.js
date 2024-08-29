import { Outlet, Navigate } from 'react-router-dom'
import { useLocation } from 'react-router'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoutes = ({
  auth: { isAuthenticated, loading }
}) => {
    const location = useLocation();
    if(loading){
      return null;
    }  
    return(
      isAuthenticated ? <Outlet/> : <Navigate to="/login" replace state={{ from: location }}/>
    )
}

PrivateRoutes.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoutes);
