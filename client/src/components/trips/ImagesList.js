import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getTrip } from '../../actions/trip';

const ImagesList = ({ getTrip, tripId, trip: { selectedTrip }}) => {
    // console.log('entro en ImagesList');
    // console.log(tripId);
    // console.log(selectedTrip);
    useEffect(() => {
        getTrip(tripId);
      }, [getTrip]);
    
    const images = selectedTrip?.images?.map((img) => 
        <tr key={img._id}>
            <td><img src={img.url.replace('upload', 'upload/ar_1.0,c_limit,h_150')} /></td>
            <td></td>
        </tr>
    );

    const goToNextPage = () => {
        // if ( ((currentPage-1)*trips.metadata.limit)+trips.metadata.count < trips.metadata.total) {
        //   setCurrentPage(currentPage+1);
        //   getTrips(`&limit=3&page=${currentPage+1}`)
        // }
        };

        const goToPrevPage = () => {
        // if (currentPage > 1) {
        //   setCurrentPage(currentPage-1);
        //   getTrips(`&limit=3&page=${currentPage-1}`)
        // }
        };     

  return (
    <div>
      <h2 className="my-2">Imagenes</h2>
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
            {images}
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

ImagesList.propTypes = {
    getTrip: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    trip: state.trip
  });

export default connect(mapStateToProps, { getTrip })(ImagesList);