import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import formatDate from '../../utils/formatDate'

const Book = ({ 
    trip: { selectedTrip },
    auth: { user, customer }
}) => {
    // console.log(selectedTrip)
    // console.log(user)
    // console.log(customer)

    return (
        <>
            <section className='container'>
                <h1 className='large text-primary'>Reserva</h1>
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
                    <input type='submit' className='btn btn-primary' value='Continuar' />
                </div>
            </section>
        </>
    )
}

const mapStateToProps = (state) => ({   
    trip: state.trip,
    auth: state.auth
})

export default connect(mapStateToProps, null)(Book);