import React from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate';

const TripItem = ({
    trip: {
        title,
        subtitle,
        location,
        duration,
        date,
        quota,
        images
    }
}) => {
  return (
    <div className="profile bg-white">
    <img
      className="round-img-slow"
      src={images[0]?.url}
      alt=""
    />
    <div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <p>{location}</p>
      <a href="profile2.html" className="btn btn-primary mg-top-1">Ver Detalle</a>
    </div>
    <div>
      <h3>Fecha:</h3>{formatDate(date)}
      <h3>Duración:</h3>{duration}
      <h3>Disponibilidad:</h3>{quota} lugares
    </div>
  </div>
  )
}

TripItem.propTypes = {
    trip: PropTypes.object.isRequired
}

export default TripItem
