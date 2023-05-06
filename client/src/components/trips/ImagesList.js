import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getTrip } from '../../actions/trip';
import ImagesListContent from './ImagesListContent';
import Spinner from '../layout/Spinner';

const ImagesList = ({ getTrip, tripId, loading }) => {
    useEffect(() => {
        getTrip(tripId);
      }, [tripId, getTrip]);
    
    return (
    <Fragment>
      {loading ? (<Spinner />) : 
      (
        <div>
          <h2 className="my-2">Imagenes</h2>
          <div className="cards">
              <ul>
                <ImagesListContent />
              </ul>
          </div>
        </div>
      )}
    </Fragment>
    );
}

ImagesList.propTypes = {
    getTrip: PropTypes.func.isRequired,
};

export default connect(null, { getTrip })(ImagesList);