import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getTrips } from '../../actions/trip';
import TripsListContent from './TripsListContent';
import Spinner from '../layout/Spinner';

const TripsList = ({ getTrips, trip: { trips, loading } }) => {
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    getTrips('&limit=3&page=1');
    setCurrentPage(1);
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

  return (
    <Fragment>
    {loading ? (
      <Spinner />
    ) : (
    <div>
      <h2 className="my-2">Eventos</h2>
      <table className="table">
          <thead>
            <tr>
              <th width="15%">Fecha</th>
              <th width="40%">Titulo</th>
              <th width="15%">Cupo</th>
              <th width="10%">Reservas</th>
              <th width="10%"></th>
              <th width="10%"></th>
            </tr>
          </thead>
          <tbody>
            <TripsListContent/>
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
                    <li className="fas fa-angle-left"></li>
                  </button>            
              </td>
              <td></td>
              <td>
              <button
                  onClick={() => goToNextPage()}
                  className="btn btn-primary btn-small"
                  title="Siguiente"
                >
                  <li className="fas fa-angle-right"></li>
                </button>
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
    </div>)}
    </Fragment>
  )
  
}

TripsList.propTypes = {
    getTrips: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  trip: state.trip
});

export default connect(mapStateToProps, { getTrips })(TripsList);