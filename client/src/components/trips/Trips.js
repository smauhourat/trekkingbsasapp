import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrips } from '../../actions/trip';

const Trips = ({ getTrips, trip: { trips, loading } }) => {
    useEffect(() => {
        getTrips();
    }, [getTrips])

    return (
        <section className="container">
        <Fragment>
            <h1 className="large text-primary">Trips</h1>
            <p className="lead">
            <i className="fab fa-connectdevelop" /> asd asdad
            </p>
            <div className="profiles">
            {/* {trips.length > 0 ? (
                trips.map((trip) => (
                // <ProfileItem key={trip._id} trip={trip} />
                    <div>trip.title</div>
                ))
            ) : (
                <h4>No se econtraron Trips...</h4>
            )} */}
            </div>
        </Fragment>
        </section>
      );    
} 

Trips.propTypes = {
    getTrips: PropTypes.func.isRequired,
    trip: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    trip: state.trip
  });
  
  export default connect(mapStateToProps, { getTrips })(Trips);
  