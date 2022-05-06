import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getTrip } from '../../actions/trip';
import Image from './Image';

const ImagesList = ({ getTrip, tripId, trip: { selectedTrip }}) => {
    useEffect(() => {
        getTrip(tripId);
      }, [getTrip]);
    
    const images = selectedTrip?.images?.map((img) => 
        <Image img={img}/>
    );

    return (
    <div>
      <h2 className="my-2">Imagenes</h2>
      <div className="cards">
          <ul>
            {images}
          </ul>
      </div>
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