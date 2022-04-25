import React, { Fragment, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TripItem from './TripItem';
import { getTrips } from '../../actions/trip';

const Trips = ({ getTrips, trip: { trips, loading } }) => {

    const queryParam = new URLSearchParams(useLocation().search).get("q");
    const query = queryParam !== undefined || queryParam !== null ? queryParam : '';
    

    useEffect(() => {
        getTrips(query);
    }, [getTrips])

    return (
        <section className="container">
        <Fragment>
            <h1 className="large text-primary">Trips</h1>
            <p className="lead">
            <i className="fab fa-connectdevelop" /> Resultado de la busqueda...
            </p>
            <div className="profiles">
            {trips.data?.length > 0 ? (
                trips.data.map((trip) => (
                <TripItem key={trip._id} trip={trip} />
                // <div key={trip._id}>
                //     <div>{trip.title}</div>
                //     <div>{query}XX</div>
                // </div>
                ))
            ) : (
                <h4>No se econtraron Trips...</h4>
            )}
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
  