import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { deleteTrip, getTrip } from '../../actions/trip';
import formatDate from '../../utils/formatDate';


const TripsListContent = ({ trip: { trips: { data } }, deleteTrip, getTrip }) => {
  const navigate = useNavigate();

  const editTrip = (id) => {
    getTrip(id);
    navigate(`/edit-trip/${id}`);
  }

  const editTripImages = (id) => {
    getTrip(id);
    navigate(`/add-images/${id}`);
  }

  const tripsList =
    data?.map((trip) => (
      <tr key={trip._id}>
        <td>{formatDate(trip.date)}</td>
        <td>{trip.title}</td>
        <td className="text-center">{trip.quota}</td>
        <td>{trip.reservations}</td>
        <td>
          ...
        </td>
        <td className="no-wrap">
          <div className="align-center">
            <button
              onClick={() => editTripImages(trip._id)}
              className="btn btn-primary btn-link"
            >
              <i className="fas fa-file-image" title="Multimedia"></i>
            </button>
            <button
              onClick={() => editTrip(trip._id)}
              className="btn btn-success"
            >
              <i className="fas fa-edit" title="Editar"></i>
            </button>
            <button
              onClick={() => deleteTrip(trip._id)}
              className="btn btn-danger"
            >
              <i className="fas fa-trash-alt" title="Eliminar"></i>
            </button>
          </div>
        </td>
      </tr>
    ));

  return (
    <>
      {tripsList}
    </>
  );
};

TripsListContent.propTypes = {
  deleteTrip: PropTypes.func.isRequired,
  getTrip: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
  trip: state.trip
});

export default connect(mapStateToProps, { deleteTrip, getTrip })(TripsListContent);
