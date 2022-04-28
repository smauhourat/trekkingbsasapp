import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addTrip } from '../../actions/trip';

const AddTrip = ({ addTrip }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        date: '',
        duration: '',
        price: '',
        location: '',
        grading: '',
        quota: '',
        reservations: ''
      });
    
      const { title, subtitle, description, date, duration, price, location, grading, quota, reservations } = formData;

      const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });      

      return (
        <section className="container">
        <h1 className="large text-primary">Trips</h1>
        <p className="lead"><i className="fas fa-user"></i> Crear Trip</p>
        <form
                className="form"
                onSubmit={(e) => {
                e.preventDefault();
                addTrip(formData, navigate);
                }}
            >
          <div className="form-group">
            <input 
                type="text" 
                placeholder="Titulo" 
                name="title" 
                value={title}
                onChange={onChange}
                required />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Subtitulo" 
              name="subtitle" 
              value={subtitle}
              onChange={onChange}              
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Descripcion"
              name="description"
              value={description}
              onChange={onChange}              
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Fecha"
              name="date"
              value={date}
              onChange={onChange}              
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Duracion"
              name="duration"
              value={duration}
              onChange={onChange}              
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Precio"
              name="price"
              value={price}
              onChange={onChange}              
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Lugar"
              name="location"
              value={location}
              onChange={onChange}              
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Grado dificultad"
              name="grading"
              value={grading}
              onChange={onChange}              
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Cupo"
              name="quota"
              value={quota}
              onChange={onChange}              
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Reservas"
              name="reservations"
              value={reservations}
              onChange={onChange}              
            />                                    
          </div>                                        
          <input type="submit" className="btn btn-primary" value="Aceptar" />
        </form>
      </section>
    );
};
    

AddTrip.propTypes = {
    addTrip: PropTypes.func.isRequired
};
  
  export default connect(null, { addTrip })(AddTrip);
