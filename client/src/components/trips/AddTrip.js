import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addTrip } from '../../actions/trip';
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
        grading: '',
        quota: '',
        reservations: '',
        suggested_equipment: ''
      });
    
      const { title, subtitle, category, description, itinerary, date, duration, price, location, grading, quota, reservations, suggested_equipment } = formData;

      const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });      

      return (
        <section className="container">
        <h1 className="large text-primary">Eventos</h1>
        <p className="lead"><i className="fas fa-user"></i> Crear Evento</p>
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
            />
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
            />
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
            <label>Fecha</label>
            <input
              type="date"
              placeholder="Fecha"
              name="date"
              value={date}
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
            <label>Lugar</label>
            <input
              type="text"
              placeholder="Lugar"
              name="location"
              value={location}
              onChange={onChange}              
            />
          </div>
          <div className="form-group">
            <label>Grado Dificultad</label>
            <input
              type="text"
              placeholder="Grado dificultad"
              name="grading"
              value={grading}
              onChange={onChange}              
            />
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
