import React, { useState, useEffect } from 'react';
import { useNavigate, useMatch, useParams } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addTrip, getTrip, clearTrip } from '../../actions/trip';
import { setAlert } from '../../actions/alert';

const initialState = {
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
  };

const TripForm = ({ 
    trip: {selectedTrip, loading},
    addTrip, 
    getTrip,
    clearTrip,
    setAlert
}) => {
    const [formData, setFormData] = useState(initialState);

    const creatingTrip = useMatch('/add-trip');
    const id = useParams().id;
    if (creatingTrip) {
        console.log('ADD TRIP');
    } else {
        
        console.log(`EDIT TRIP: ${id}`);
    }

    const navigate = useNavigate();
    
    useEffect(() => {
        // if there is no profile, attempt to fetch one
        if (!selectedTrip) getTrip();
    
        // if we finished loading and we do have a profile
        // then build our profileData
        if (!loading && selectedTrip) {
          const tripData = { ...initialState };
          for (const key in selectedTrip) {
            if (key in tripData) tripData[key] = selectedTrip[key];
          }

          // set local state with the profileData
          setFormData(tripData);
        }
      }, [loading, getTrip, selectedTrip, clearTrip]);
    
      const { 
          title, 
          subtitle, 
          description, 
          date, 
          duration, 
          price, 
          location, 
          grading, 
          quota, 
          reservations, 
          suggested_equipment 
        } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });      

    const onSubmit = (e) => {
        e.preventDefault();
        addTrip(formData, navigate);
        };

      return (
        <section className="container">
        <h1 className="large text-primary">Trips</h1>
        <p className="lead"><i className="fas fa-user"></i> Crear Trip</p>
        <form
                className="form"
                onSubmit={onSubmit}
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

TripForm.propTypes = {
    addTrip: PropTypes.func.isRequired,
    getTrip: PropTypes.func.isRequired,
    clearTrip: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    trip: state.trip
  });
  

export default connect(mapStateToProps, { addTrip, getTrip, clearTrip, setAlert })(TripForm);
