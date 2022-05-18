import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addTrip, getTrip } from '../../actions/trip';

const EditTrip = ({ 
    trip: {selectedTrip, loading}, 
    addTrip, 
    getTrip 
}) => {
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
        reservations: '',
        suggested_equipment: ''
      });
    
      const id = useParams().id;

      useEffect(() => {
        //console.log(id);
        //getTrip(id);

        setFormData({
            title: loading || !selectedTrip.title ? 'cacacac' : selectedTrip.title,
            subtitle: loading || !selectedTrip.subtitle ? '' : selectedTrip.subtitle,
            description: loading || !selectedTrip.description ? '' : selectedTrip.description,
            date: loading || !selectedTrip.date ? '' : selectedTrip.date,
            duration: loading || !selectedTrip.duration ? '' : selectedTrip.duration,
            price: loading || !selectedTrip.price ? '' : selectedTrip.price,
            location: loading || !selectedTrip.location ? '' : selectedTrip.location,
            grading: loading || !selectedTrip.grading ? '' : selectedTrip.grading,
            quota: loading || !selectedTrip.quota ? '' : selectedTrip.quota,
            reservations: loading || !selectedTrip.reservations ? '' : selectedTrip.reservations,
            suggested_equipment: loading || !selectedTrip.suggested_equipment ? '' : selectedTrip.suggested_equipment
        });

        console.log(selectedTrip);
      }, [])

      const { title, subtitle, description, date, duration, price, location, grading, quota, reservations, suggested_equipment } = formData;

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
            <textarea 
              placeholder="Descripcion"
              rows="5"
              name="description"
              value={description}
              onChange={onChange}              
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Equipo Sugerido"
              rows="5"
              name="suggested_equipment"
              value={suggested_equipment}
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
          <input type="button" className="btn btn-secondary" value="Cancelar" onClick={() => navigate('/dashboard')} />
        </form>
      </section>
    );
};
    

EditTrip.propTypes = {
    addTrip: PropTypes.func.isRequired,
    getTrip: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    trip: state.trip
  });

  
export default connect(mapStateToProps, { addTrip, getTrip })(EditTrip);
