import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addTrip } from '../../actions/trip';
import training_levels from '../../models/TrainingLevel.json'

//https://www.youtube.com/watch?v=Rw_QeJLnCK4
//https://www.youtube.com/watch?v=Y-VgaRwWS3o
const AddTrip = ({ addTrip }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: '',
    description: '',
    itinerary: '',
    date: '',
    duration: '',
    price: '',
    location: '',
    quota: '',
    reservations: '',
    suggested_equipment: '',
    included_services: '',
    departure: '',
    arrival: '',
    booking_price: '',
    training_level: ''
  });

  console.log(training_levels.training_levels)

  const { title, subtitle, category, description, itinerary, date, duration, price, location, quota, reservations, suggested_equipment, included_services, departure, arrival, booking_price, training_level } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="container">
      <h1 className="large text-primary">Eventos</h1>
      <p className="lead"><i className="fas fa-calendar"></i> Crear Evento</p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addTrip(formData, navigate);
        }}
      >
        <div className="form-group">
          <label>Titulo</label>
          <input
            type="text"
            placeholder="Titulo"
            name="title"
            value={title}
            onChange={onChange}
            required />
        </div>
        <div className="form-group">
          <label>Subtitulo</label>
          <input
            type="text"
            placeholder="Subtitulo"
            name="subtitle"
            value={subtitle}
            onChange={onChange}
            required />
        </div>
        <div>
          <label>Categoria</label>
          <select name="category" value={category} onChange={onChange}>
            <option>* Selecione una Categoria</option>
            <option value="Trekking">Trekking</option>
            <option value="Caminatas">Caminatas</option>
            <option value="Mountain Bike">Mountain Bike</option>
            <option value="Kayaks">Kayaks</option>
          </select>
        </div>
        <div className="form-group">
          <label>Descripcion</label>
          <textarea
            placeholder="Descripcion"
            rows="5"
            name="description"
            value={description}
            onChange={onChange}
            required />
        </div>
        <div className="form-group">
          <label>Itinerario</label>
          <textarea
            placeholder="Itinerario"
            rows="5"
            name="itinerary"
            value={itinerary}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Equipo Sugerido</label>
          <textarea
            placeholder="Equipo Sugerido"
            rows="5"
            name="suggested_equipment"
            value={suggested_equipment}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Servicios Incluidos</label>
          <textarea
            placeholder="Servicios Incluidos"
            rows="5"
            name="included_services"
            value={included_services}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Fecha</label>
          <input
            type="date"
            placeholder="Fecha"
            name="date"
            value={date}
            onChange={onChange}
            required />
        </div>

        <div className="form-group">
          <label>Salida</label>
          <input
            type="text"
            placeholder="Salida"
            name="departure"
            value={departure}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label>Llegada</label>
          <input
            type="text"
            placeholder="Llegada"
            name="arrival"
            value={arrival}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label>Duración</label>
          <input
            type="text"
            placeholder="Duracion"
            name="duration"
            value={duration}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input
            type="text"
            placeholder="Precio"
            name="price"
            value={price}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Precio Reserva</label>
          <input
            type="text"
            placeholder="Precio Reserva"
            name="booking_price"
            value={booking_price}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Lugar</label>
          <input
            type="text"
            placeholder="Lugar"
            name="location"
            value={location}
            onChange={onChange}
            required />
        </div>
        <div>
          <label>Nivel Entrenamiento</label>
          <select name="training_level" value={training_level} onChange={onChange}>
            <option>* Selecione un Nivel</option>
            {training_levels.training_levels.map((item) => {
              return <option key={item.order} value={item.name}>{item.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Cupo</label>
          <input
            type="text"
            placeholder="Cupo"
            name="quota"
            value={quota}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Reservas</label>
          <input
            type="text"
            placeholder="Reservas"
            name="reservations"
            value={reservations}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Aceptar" />
        <input type="button" className="btn btn-secondary" value="Cancelar" onClick={() => navigate('/dashboard')} />
      </form>
    </section>
  );
};


AddTrip.propTypes = {
  addTrip: PropTypes.func.isRequired
};

export default connect(null, { addTrip })(AddTrip);
