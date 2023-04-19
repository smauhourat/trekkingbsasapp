import React, { Fragment, useState } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { forgotPassword } from '../../actions/auth';

const ForgotPassword = ({ forgotPassword }) => {
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log('SUCCESS');
        forgotPassword(email);
    }

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Recuperar Contraseña</h1>
        <p className="lead"><i className="fas fa-user"></i> Email</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required
              autoFocus
            />
          </div>
          <input id="form-login-submit-button" type="submit" className="btn btn-primary" value="Enviar Mail" />
        </form>
      </section>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  //isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, forgotPassword })(ForgotPassword);