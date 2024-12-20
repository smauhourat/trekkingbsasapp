import React, { useEffect, Fragment } from 'react'
import Spinner from '../layout/Spinner'
import { Link, useParams, useNavigate, useHistory } from 'react-router-dom'
import { formatDateISOFromDate, formatDate } from '../../utils/dateHelper'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import training_levels from '../../models/TrainingLevel.json'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getTrip } from '../../actions/trip';
import { setAlert } from '../../actions/alert';

const TripDetails = ({ getTrip, setAlert, trip: { selectedTrip } }) => {

  const currentDate = new Date();

  const { id, view } = useParams()
  // console.log('view =>', view)
  // console.log('BOOL view =>', !!!view)

  const navigate = useNavigate()

  const goBack = () => navigate(-1);

  useEffect(() => {
    getTrip(id)
  }, [getTrip, id])

  const getTrainingLevel = (training_level) => {
    const training_level_description = training_levels.training_levels.filter(function (el) {
      return el.name === training_level;
    });
    return training_level_description;
  }

  const showBookButton = () => {
    if (
      (
        (selectedTrip?.quota - selectedTrip?.reservations) > 0) 
        && 
        (selectedTrip.price > 0) 
        && 
        (formatDateISOFromDate(selectedTrip.date) >= formatDateISOFromDate(currentDate) 
        &&
        view === 'false'
      )
    ) {
      return true
    }

    return false
  }

  const haveExtras = () => {
    return (selectedTrip.suggested_equipment || selectedTrip.included_services)
  }

  const showExtras = () => {

    if (!selectedTrip.suggested_equipment && !selectedTrip.included_services) return
    
    return (
      <div className='profile-edu bg-white p-2'>
        {(selectedTrip.suggested_equipment && 
        <>
          <h2 className='text-primary'>Equipo Sugerido</h2>
          <div><p><strong>Detalle: </strong>{selectedTrip?.suggested_equipment}</p></div>
        </>)}
        {(selectedTrip.included_services && 
        <>
          <h2 className='text-primary'>Servicios Incluidos</h2>
          <div><p>{selectedTrip?.included_services}</p></div>
        </>)}
      </div>
    )
  }

  return (
    <section className='container'>
      {
        selectedTrip === null || selectedTrip === undefined ? (
          <Spinner />
        ) : (
          <>
            <div className={haveExtras() ? 'profile-grid my-1' : 'profile-grid2 my-1'}>
              <div className='profile-top p-2'>
                <h1 className='medium mg-top-1'>{selectedTrip?.title}</h1>
                <p className='small'>{selectedTrip?.subtitle}</p>
                {selectedTrip.images?.length > 0 && <ImageGallery items={selectedTrip.images.map((img) => { return ({ original: img.url.toString().replace('http:', 'https:') }) })} />}
              </div>
              <div className='profile-about bg-light p-2'>
                <p>
                  {selectedTrip?.description}
                </p>
                <div className='line' />
              </div>

              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Datos Importantes</h2>
                <div>
                  <h3 className="text-dark">Lugar</h3>
                  <p className="highlight2">{selectedTrip?.location}</p>
                  <h3 className="text-dark">Fecha</h3>
                  <p className="highlight2">{formatDate(selectedTrip?.date)}</p>
                  <p>&nbsp;</p>
                  <p><strong>Duración: </strong>{selectedTrip?.duration}</p>
                  <p><strong>Nivel: </strong>{selectedTrip?.training_level} <span className="footnote">({getTrainingLevel(selectedTrip?.training_level)[0]?.description})</span></p>
                  <p><strong>Salida: </strong>{selectedTrip?.departure}</p>
                  <p><strong>Llegada: </strong>{selectedTrip?.arrival}</p>
                  <p><strong>Disponibilidad: </strong>{selectedTrip?.quota - selectedTrip?.reservations} lugares</p>
                  <p><strong>Precio: </strong>${selectedTrip?.price} (por persona)</p>
                  <p><strong>Precio Reserva: </strong>${selectedTrip?.booking_price} (por persona)</p>

                </div>
                {selectedTrip.itinerary && (
                    <div>
                      <h2 className='text-primary'>Itinerario</h2>
                      <p>{selectedTrip.itinerary}</p>
                    </div>
                )}
              </div>

              <div className='profile-github'>
                  <Link onClick={(e) => goBack()} className='btn btn-primary'>
                    <i className='text-primary' /> Volver
                  </Link>                
                {
                  showBookButton() && 
                  (
                    <Link to={'/trip-book/' + selectedTrip._id} state={{ data: selectedTrip }} className='btn btn-primary'>
                      <i className='text-primary' /> Reservar
                    </Link>                
                  )
                }

              </div>
              {showExtras()}
            </div>
          </>
        )
      }
    </section>
  )
}

TripDetails.propTypes = {
  getTrip: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  trip: state.trip
})

export default connect(mapStateToProps, { getTrip, setAlert })(TripDetails);
