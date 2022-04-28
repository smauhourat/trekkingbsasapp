import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addUser } from '../../actions/user';

const AddUser = ({ addUser }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
      });
    
      const { name, email, password, password2 } = formData;

      const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });      

      return (
        <section className="container">
        <h1 className="large text-primary">Usuarios</h1>
        <p className="lead"><i className="fas fa-user"></i> Crear Usuario</p>
        <form
                className="form"
                onSubmit={(e) => {
                e.preventDefault();
                addUser(formData, navigate);
                }}
            >
          <div className="form-group">
            <input 
                type="text" 
                placeholder="Name" 
                name="name" 
                value={name}
                onChange={onChange}
                required />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              name="email" 
              value={email}
              onChange={onChange}              
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={onChange}              
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={onChange}              
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Aceptar" />
          <input type="button" className="btn btn-secondary" value="Cancelar" onClick={() => navigate('/dashboard')} />
        </form>
      </section>
    );
};
    

AddUser.propTypes = {
    addUser: PropTypes.func.isRequired
};
  
  export default connect(null, { addUser })(AddUser);
