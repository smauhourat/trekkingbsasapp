import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { deleteTrip, getTrip } from '../../actions/trip';
import formatDate from '../../utils/formatDate';


const TripsListContent = ({trip: {trips: {data, metadata}}, deleteTrip, getTrip}) => {
  const navigate = useNavigate();

  const editTrip = (id) => {
    getTrip(id);
    navigate(`/edit-trip/${id}`);
  }

    const tripsList =  
    data?.map((trip) => (
      <tr key={trip._id}>
        <td>{formatDate(trip.date)}</td> 
        <td>{trip.title}</td>
        <td className="text-center">{trip.quota}</td>
        <td>{trip.reservations}</td>
        <td>
          <Link to={`/add-images/${trip._id}`} className='btn btn-primary btn-link'>
            <i className="fas fa-file-image" title="Multimedia"></i>
          </Link>          
        </td>
        <td>
          <button
            onClick={() => editTrip(trip._id)}
            className="btn btn-success"
          >
            <i className="fas fa-edit" title="Edit"></i>
          </button>          
          {/* <Link to={`/edit-trip/${trip._id}`} className='btn btn-success btn-link'>
            <i className="fas fa-edit" title="Edit"></i>
          </Link>            */}
          <button
            onClick={() => deleteTrip(trip._id)}
            className="btn btn-danger"
          >
            <i className="fas fa-trash-alt" title="Eliminar"></i>
          </button>
        </td>      
      </tr>
    ));
  
    return (
            <>
              {tripsList}
              <tr>
                <td colSpan="5">
                  <div className="tiny">
                    página {metadata?.page} de {Math.ceil(metadata?.total/metadata?.limit)} - total de Registros: {metadata?.total}
                  </div>
                </td>
              </tr>
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
