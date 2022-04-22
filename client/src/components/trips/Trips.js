import React, { Fragment, useEffect } from 'react';
import { getTrips } from '../../actions/trip';

const Trips = ({ getTrips, trip: { trips, loading } }) => {

}

v.propTypes = {
    getTrips: PropTypes.func.isRequired,
    trip: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    trip: state.trip
  });
  
  export default connect(mapStateToProps, { getTrips })(Trips);
  