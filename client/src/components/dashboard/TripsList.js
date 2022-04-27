import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { deleteTrip } from '../../actions/trip';
import formatDate from '../../utils/formatDate';
import { getTrips } from '../../actions/trip';

const TripsList = ({ getTrips, trip: { trips } }) => {
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    getTrips('&limit=3&page=1');
    setCurrentPage(1);
    console.log('useEffect in TripsList');
  }, [getTrips]);

  const goToNextPage = () => {
    if ( ((currentPage-1)*trips.metadata.limit)+trips.metadata.count < trips.metadata.total) {
      setCurrentPage(currentPage+1);
      getTrips(`&limit=3&page=${currentPage+1}`)
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage-1);
      getTrips(`&limit=3&page=${currentPage-1}`)
    }
  };  

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
      {/* <code>{JSON.stringify(trips.metadata)}</code> */}
      <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th className="hide-sm">Fecha</th>
              <th className="hide-sm">Creacion</th>
              <th className="hide-sm">Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tripsList}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>
                <button
                    onClick={() => goToPrevPage()}
                    className="btn btn-primary btn-small"
                    title="Anterior"
                  >
                    &lt;
                  </button>            
              </td>
              <td></td>
              <td>
              <button
                  onClick={() => goToNextPage()}
                  className="btn btn-primary btn-small"
                  title="Siguiente"
                >
                  &gt;
                </button>
              </td>
              <td></td>
            </tr>
          </tfoot>
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