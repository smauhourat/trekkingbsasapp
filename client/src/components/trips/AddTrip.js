import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { addTrip } from '../../actions/trip'
import training_levels from '../../models/TrainingLevel.json'
import { formatDateISOFromDate } from '../../utils/dateHelper'

const AddTrip = ({ setAlert, addTrip }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: '',
    description: '',
    itinerary: '',
    date: '', // formatDateISOFromDate(Date.now()),
    duration: '',
    price: '',
    location: '',
    quota: '',
    reservations: '',
    published: true,
    suggested_equipment: '',
    included_services: '',
    departure: '',
    arrival: '',
    booking_price: '',
    training_level: '',
    payment_link: ''
  })

  const { title, subtitle, category, description, itinerary, date, duration, price, location, quota, reservations, published, suggested_equipment, included_services, departure, arrival, booking_price, training_level, payment_link } = formData

  const onChange = (e) => {
    const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: newValue })
  }

  const validateForm = () => {
    if (parseInt(reservations) > parseInt(quota)) {
      setAlert('Las Reservas no pueden ser mayores al Cupo', 'danger')
      return false
    }
    return true
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      addTrip(formData, navigate)
    }
  }

  return (
    <section className='container'>
      <h1 className='large text-primary'>Eventos</h1>
      <p className='lead'><i className='fas fa-calendar' /> Crear Evento</p>
      <p className='mini'>Los campos marcados con <span className='mark-danger'>*</span> son obligatorios</p>
      <form
        className='form'
        onSubmit={e => onSubmit(e)}
      >
        <div className='form-group'>
          <label className='mark-danger small'>*</label> <label>Titulo</label>
          <input
            type='text'
            placeholder='Titulo'
            name='title'
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label className='mark-danger small'>*</label> <label>Subtitulo</label>
          <input
            type='text'
            placeholder='Subtitulo'
            name='subtitle'
            value={subtitle}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label className='mark-danger small'>*</label> <label>Lugar</label>
          <input
            type='text'
            placeholder='Lugar'
            name='location'
            value={location}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label className='mark-danger small'>*</label> <label>Categoria</label>
          <select name='category' value={category} onChange={onChange} required>
            <option value=''>* Selecione una Categoria</option>
            <option value='Trekking'>Trekking</option>
            <option value='Caminatas'>Caminatas</option>
            <option value='Mountain Bike'>Mountain Bike</option>
            <option value='Kayaks'>Kayaks</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='mark-danger small'>*</label> <label>Descripcion</label>
          <textarea
            placeholder='Descripcion'
            rows='5'
            name='description'
            value={description}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Itinerario</label>
          <textarea
            placeholder='Itinerario'
            rows='5'
            name='itinerary'
            value={itinerary}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label>Equipo Sugerido</label>
          <textarea
            placeholder='Equipo Sugerido'
            rows='5'
            name='suggested_equipment'
            value={suggested_equipment}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label>Servicios Incluidos</label>
          <textarea
            placeholder='Servicios Incluidos'
            rows='5'
            name='included_services'
            value={included_services}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label className='mark-danger small'>*</label> <label>Fecha</label>
          <input
            type='date'
            placeholder='Fecha'
            name='date'
            value={date}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>Salida</label>
          <input
            type='text'
            placeholder='Salida'
            name='departure'
            value={departure}
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <label>Llegada</label>
          <input
            type='text'
            placeholder='Llegada'
            name='arrival'
            value={arrival}
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <label>Duración</label>
          <input
            type='text'
            placeholder='Duracion'
            name='duration'
            value={duration}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label>Precio</label>
          <input
            type='text'
            placeholder='Precio'
            name='price'
            value={price}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label>Precio Reserva</label>
          <input
            type='text'
            placeholder='Precio Reserva'
            name='booking_price'
            value={booking_price}
            onChange={onChange}
          />
        </div>
        <div>
          <label className='mark-danger small'>*</label> <label>Nivel Entrenamiento</label>
          <select name='training_level' value={training_level} onChange={onChange} required>
            <option value=''>* Selecione un Nivel</option>
            {training_levels.training_levels.map((item) => {
              return <option key={item.order} value={item.name}>{item.name}</option>
            })}
          </select>
        </div>
        <div className='form-group'>
          <label>Cupo</label>
          <input
            type='text'
            placeholder='Cupo'
            name='quota'
            pattern='[0-9]*'
            value={quota}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label>Reservas</label>
          <input
            type='text'
            placeholder='Reservas'
            name='reservations'
            pattern='[0-9]*'
            value={reservations}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label>Link de Pago</label>
          <input
            type='text'
            placeholder='Link'
            name='payment_link'
            value={payment_link}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='checkbox'
            name='published'
            checked={published}
            onChange={onChange}
          />
          <label>Publicado</label>
        </div>
        <input type='submit' className='btn btn-primary' value='Aceptar' />
        <input type='button' className='btn btn-secondary' value='Cancelar' onClick={() => navigate('/dashboard')} />
      </form>
    </section>
  )
}

AddTrip.propTypes = {
  setAlert: PropTypes.func.isRequired,
  addTrip: PropTypes.func.isRequired
}

export default connect(null, { setAlert, addTrip })(AddTrip)
