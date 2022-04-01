import React, { Fragment, useState } from "react";
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
//import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log('SUCCESS');
    }

  return (
    <Fragment>
      <section className="container">
        <div className="alert alert-danger">
          Credenciales inválidas
        </div>
        <h1 className="large text-primary">Ingreso</h1>
        <p className="lead"><i className="fas fa-user"></i> Ingrese a su cuenta</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Ingresar" />
        </form>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  //login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}


const mapStateToProps = (state) => ({
  //isAuthenticated: state.auth.isAuthenticated
});


//export default connect(mapStateToProps, { setAlert, login })(Login);
export default connect(mapStateToProps, { setAlert })(Login);