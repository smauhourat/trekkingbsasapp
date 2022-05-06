import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getTrip } from '../../actions/trip';
import ImagesListContent from './ImagesListContent';

const ImagesList = ({ getTrip, tripId }) => {
    useEffect(() => {
        getTrip(tripId);
      }, [getTrip]);
    
    return (
    <div>
      <h2 className="my-2">Imagenes</h2>
      <div className="cards">
          <ul>
            <ImagesListContent />
          </ul>
      </div>
    </div>

  )
}

ImagesList.propTypes = {
    getTrip: PropTypes.func.isRequired,
};

export default connect(null, { getTrip })(ImagesList);