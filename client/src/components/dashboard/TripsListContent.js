import React from "react";
import PropTypes from "prop-types";
import formatDate from '../../utils/formatDate';

const TripsListContent = ({trips, deleteTrip}) => {
    console.log(deleteTrip);
    const tripsList =  
    trips?.map((trip) => (
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
            Eliminar
          </button>
        </td>      
      </tr>
    ));
  
    return <>{tripsList}</>;
};

TripsListContent.propTypes = {};

export default TripsListContent;
