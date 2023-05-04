import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MaintenanceRoute = ({
    component: Component
    //appConf: { isOnline, loading }
}) => {
    // if (isOnline) return <Component />;
    if (!process.env.REACT_APP_ISMAINTENANCE) return <Component />;

    return <Navigate to="/maintenance" />;
};

MaintenanceRoute.propTypes = {
    //appConf: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    //appConf: state.appConf
});

export default connect(mapStateToProps)(MaintenanceRoute);
