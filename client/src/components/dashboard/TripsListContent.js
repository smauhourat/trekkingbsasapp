import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { deleteTrip } from '../../actions/trip';
import formatDate from '../../utils/formatDate';

const TripsListContent = ({trip: {trips: {data, metadata}}, deleteTrip}) => {
    const tripsList =  
    data?.map((trip) => (
      <tr key={trip._id}>
        <td>{trip.title}</td>
        <td>{formatDate(trip.date)}</td> 
        <td>{formatDate(trip.created)}</td>
        <td>-</td>
        <td>
          <Link to={`/add-images/${trip._id}`} className='btn btn-primary btn-link'>
            Imagenes
          </Link>          
          <button
            onClick={() => deleteTrip(trip._id)}
            className="btn btn-danger"
          >
            Eliminar
          </button>
        </td>      
      </tr>
    ));
  
    return <>{tripsList}<tr><td colSpan="5"><div className="tiny">página {metadata?.page} de {Math.ceil(metadata?.total/metadata?.limit)} - total de Registros: {metadata?.total}</div></td></tr></>;
};

TripsListContent.propTypes = {
    deleteTrip: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
    trip: state.trip
  });

export default connect(mapStateToProps, { deleteTrip })(TripsListContent);
