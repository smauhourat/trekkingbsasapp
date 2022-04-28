import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getTrips } from '../../actions/trip';
import TripsListContent from './TripsListContent';

const TripsList = ({ getTrips, trip: { trips } }) => {
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
    <div>
      <h2 className="my-2">Trips</h2>
      {/* <code>{JSON.stringify(trips.metadata)}</code> */}
      <table className="table">
          <thead>
            <tr>
              <th width="40%">Nombre</th>
              {/* <th className="hide-sm">Fecha</th> */}
              <th width="15%">Fecha</th>
              <th width="15%">Creacion</th>
              <th width="10%">Estado</th>
              <th width="20%"></th>
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
    getTrips: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  trip: state.trip
});

export default connect(mapStateToProps, { getTrips })(TripsList);