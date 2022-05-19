import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { updateTrip } from '../../actions/trip';

const EditTrip = ({ 
    trip: {trips}, 
    updateTrip
}) => {
    const navigate = useNavigate();
    
    const [editedTrip, setEditedTrip] = useState({
    title: '',
    subtitle: '',
    description: '',
    created: Date.now,
    date: null,
    duration: '',
    price: 0,
    location: '',
    grading: 0,
    quota: 0,
    reservations: 0,
    suggested_equipment: ''
  })    

   
      const id = useParams().id;

      useEffect(() => {
        
        const trip = trips.data.find(trip  => trip._id === id);
        setEditedTrip(trip);
      }, [id, trips.data]);
      
      const { title, subtitle, description, date, duration, price, location, grading, quota, reservations, suggested_equipment } = editedTrip;

      const onChange = (e) =>
        setEditedTrip({ ...editedTrip, [e.target.name]: e.target.value });      

      return (
        <section className="container">
        <h1 className="large text-primary">Eventos</h1>
        <p className="lead"><i className="fas fa-user"></i> Crear Evento</p>
        <form
                className="form"
                onSubmit={(e) => {
                e.preventDefault();
                updateTrip(id, editedTrip, navigate);
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
              type="text"
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
    

EditTrip.propTypes = {
    updateTrip: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    trip: state.trip
  });

  
export default connect(mapStateToProps, { updateTrip })(EditTrip);
