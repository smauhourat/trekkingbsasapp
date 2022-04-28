import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { deleteTrip } from '../../actions/trip';
import formatDate from '../../utils/formatDate';

const TripsListContent = ({trip: {trips}, deleteTrip}) => {
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
            Eliminar
          </button>
        </td>      
      </tr>
    ));
  
    return <>{tripsList}<tr><td>{trips?.metadata?.total} registros en total</td></tr></>;
};

TripsListContent.propTypes = {
    deleteTrip: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
    trip: state.trip
  });

export default connect(mapStateToProps, { deleteTrip })(TripsListContent);
