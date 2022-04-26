import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { deleteTrip } from '../../actions/trip';
import formatDate from '../../utils/formatDate';
import { getTrips } from '../../actions/trip';

const TripsList = ({ getTrips, trip: { trips } }) => {
  useEffect(() => {
    getTrips('&limit=3&page=1')
  }, [getTrips]);


  const tripsList =  
    trips?.data?.map((trip) => (
      <tr key={trip._id}>
        <td>{trip.title}</td>
        <td>{formatDate(trip.date)}</td> 
        <td>{formatDate(trip.created)}</td>
        <td>-</td>
        <td>
          <button
            onClick={() => deleteTrip(trip._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>      
      </tr>
    ))
  return (
    <div>
      <h2 className="my-2">Trips</h2>
      {/* <div>{JSON.stringify(trip)}</div> */}
      <code>{JSON.stringify(trips.metadata)}</code>
      <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th className="hide-sm">Fecha</th>
              <th className="hide-sm">Creacion</th>
              <th className="hide-sm">Estado</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tripsList}
          </tbody>
        </table>
    </div>
  )
  
}

TripsList.propTypes = {
    getTrips: PropTypes.func.isRequired,
    deleteTrip: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  trip: state.trip
});

export default connect(mapStateToProps, { getTrips, deleteTrip })(TripsList);