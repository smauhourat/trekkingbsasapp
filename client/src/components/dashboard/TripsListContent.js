import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteTrip, getTrip } from '../../actions/trip'
import { formatDate } from '../../utils/dateHelper'
import ConfirmationModal from '../layout/ConfirmationModal'

const TripsListContent = ({ trip: { trips: { data } }, deleteTrip, getTrip }) => {
  const navigate = useNavigate()
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState()

  const editTrip = (id) => {
    getTrip(id)
    navigate(`/edit-trip/${id}`)
  }

  const viewBooks = (id) => {
    getTrip(id)
    navigate(`/books-admin/${id}`)
  }

  const editTripImages = (id) => {
    getTrip(id)
    navigate(`/add-images/${id}`)
  }

  const handleDeleteAccountModal = (e, id) => {
    e.preventDefault()
    setIdToDelete(id)
    setShowConfirmationModal(true)
}

const handleCancelDelete = () => {
    setShowConfirmationModal(false);
}

const handleOkDelete = (id) => {
    setShowConfirmationModal(false);
    setIdToDelete(null)
    // alert(`delete element: ${id}`)
    deleteTrip(id, navigate)
}    

  const tripsList =
    data?.map((trip) => (
      <tr key={trip._id}>
        <td>{formatDate(trip.date)}</td>
        <td>{trip.title}</td>
        <td style={{ textAlign: 'center' }}>{trip.quota}</td>
        <td style={{ textAlign: 'center' }}>
          <a onClick={() => viewBooks(trip._id)} className='link' title='Ver Reservas'>
            {trip.reservations}
          </a>
        </td>
        <td style={{ textAlign: 'center' }}>{trip.published ? 'SI' : 'NO'}</td>
        <td className='no-wrap'>
          <div className='align-center'>
            <button
              onClick={() => editTripImages(trip._id)}
              className='btn btn-small btn-square btn-primary'
            >
              <i className='fas fa-file-image' title='Multimedia' />
            </button>
            <button
              onClick={() => editTrip(trip._id)}
              className='btn btn-small btn-square btn-success'
            >
              <i className='fas fa-edit' title='Editar' />
            </button>
            <button
              onClick={() => viewBooks(trip._id)} 
              className='btn btn-small btn-square btn-warning'
            >
              <i className='fas fa-book' title='Ver Reservas' />
            </button>
            {/* <button
              onClick={() => deleteTrip(trip._id, navigate)}
              className='btn btn-small btn-square btn-danger'
            >
              <i className='fas fa-trash-alt' title='Eliminar' />
            </button> */}
            <button 
                className='btn btn-small btn-square btn-danger' 
                onClick={(e) => handleDeleteAccountModal(e, trip._id)}>
                    <i className='fas fa-trash-alt' title='Eliminar' />
            </button>

          </div>
        </td>
      </tr>
    ))

  return (
    <>
      {tripsList}
      <ConfirmationModal show={showConfirmationModal} message="Está seguro que desea eliminar el Evento?" params={idToDelete} onCancel={handleCancelDelete} onOk={handleOkDelete}/>
    </>
  )
}

TripsListContent.propTypes = {
  deleteTrip: PropTypes.func.isRequired,
  getTrip: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  trip: state.trip
})

export default connect(mapStateToProps, { deleteTrip, getTrip })(TripsListContent)
