import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createBook } from '../../services';
import { setAlert } from '../../actions/alert'
import formatDate from '../../utils/formatDate'
import convertToSlug from '../../utils/convertToSlug';

const Book = ({ 
    trip: { selectedTrip },
    auth: { user, customer },
    setAlert
}) => {
    console.log("selectedTrip =>", selectedTrip)
    console.log("user =>", user)
    console.log("customer =>", customer)

    const handleBook = async (e) => {
        try {
            const res = await createBook(customer._id, selectedTrip._id, selectedTrip.price, `reserva-${convertToSlug(selectedTrip.title)}-${selectedTrip.date.substring(0, 10)}`)
            if (res)
                window.location.href = "http://www.google.com" //"enviar a la pagina d confirm"
        } catch (err) {
            if (err.response.status === 400)
                setAlert(err.response.data.message, "danger")

            const errors = err.response.data.errors;

            if (errors) {
                setAlert('Ha ocurrido un error, intente mas tarde', 'danger');
            }
        }
    }

    return (
        <>
            <section className='container'>
                <h1 className='large text-primary'>Reservaa</h1>
                <div className="profile-exp bg-white p-1">
                    <h2 className='text-primary'>Evento</h2>
                    <div>
                        <p><strong>Lugar: </strong>{selectedTrip?.location}</p>
                        <p><strong>Fecha: </strong>{formatDate(selectedTrip?.date)}</p>
                        <p><strong>Duración: </strong>{selectedTrip?.duration}</p>
                        <p><strong>Salida: </strong>{selectedTrip?.departure}</p>
                        <p><strong>Llegada: </strong>{selectedTrip?.arrival}</p>
                        <p><strong>Disponibilidad: </strong>{selectedTrip?.quota - selectedTrip?.reservations} lugares</p>
                        <p><strong>Precio: </strong>${selectedTrip?.price} (por persona)</p>
                        <p><strong>Precio Reserva: </strong>${selectedTrip?.booking_price} (por persona)</p>

                    </div>
                </div>
                <div className='profile-edu bg-white p-1'>
                    <h2 className='text-primary'>Tus Datos</h2>
                    <div>
                        <p><strong>Nombre: </strong>{customer?.last_name}, {customer?.first_name}</p>
                        <p><strong>Email: </strong>{user?.email}</p>
                        <p><strong>Telefono: </strong>{customer?.phone}</p>
                    </div>
                </div>                
                <div>
                    <input type='button' className='btn btn-primary' value='Continuar' onClick={handleBook} />
                </div>
            </section>
        </>
    )
}

Book.propTypes = {
    setAlert: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({   
    trip: state.trip,
    auth: state.auth
})

export default connect(mapStateToProps, { setAlert })(Book);