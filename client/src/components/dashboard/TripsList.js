import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { deleteTrip } from '../../actions/trip';
import formatDate from '../../utils/formatDate';

const TripsList = ({ trips, deleteTrip }) => {
  const tripsList = trips?.map((trip) => (
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
    trips: PropTypes.array.isRequired,
    deleteTrip: PropTypes.func.isRequired
}

export default connect(null, { deleteTrip })(TripsList);