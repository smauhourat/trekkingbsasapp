import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatDate } from '../../utils/dateHelper'

const TripItem = ({
  trip
}) => {
  return (
    <div key={trip._id} className='trip-grid bg-white'>
      <div className='trip-top crop'>
          <span className='sticker'>
          {formatDate(trip.date)}
          </span>
        <img
          className='round-img-slow'
          src={trip.images[0]?.url}
          alt=''
          />
      </div>
      <div className='trip-desc'>
        <h2>{trip.title}</h2>
        <p>{trip.subtitle}</p>
        <p className='mt-15'>{trip.location}</p>
        <Link to={`/trip-details/${trip._id}/false`} state={{ data: trip }} className='btn btn-primary mt-10'>
          <i className='text-primary' /> Ver Detalle
        </Link>
      </div>
      <div className='trip-foot1'>
        {trip.category &&
          (<span><h3>Categoria:</h3><div>{trip.category}</div></span>)}
        <h3>Fecha:</h3>{formatDate(trip.date)}
      </div>
      <div className='trip-foot2'>
        {trip.duration && (<><h3>Duración:</h3>{trip.duration}</>)}
        <h3>Disponibilidad:</h3>{trip?.quota - trip?.reservations} lugares
      </div>
    </div>
  )
}

TripItem.propTypes = {
  trip: PropTypes.object.isRequired
}

export default TripItem
