import React, { Fragment, useEffect, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const location = useLocation();

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password)
  }

  useEffect(() => {
    //console.log('USE EFECT')
    // Redirect if is logged in
     if (isAuthenticated) {
       if (location.state?.from) {
         navigate(location.state.from)
       } else {
         //console.log('AUTENTICADO EN USE EFECTTTTTTTTTTTTTTT')
         navigate('/dashrouter');
       }
     }
  }, [])

  // console.log(`isAuthenticated: ${isAuthenticated}`)
  // console.log(`location.state?.from: ${JSON.stringify(location.state?.from)}`)

  return (
    <>
      <section className='container align-center'>
        <div className="login-form">
          <h1 className='large text-primary'>Ingreso</h1>
          <p className='lead'><i className='fas fa-user' /> Ingrese a su cuenta</p>
          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required
                autoFocus
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Contraseña'
                name='password'
                value={password}
                onChange={e => onChange(e)}
                minLength='6'
                autoComplete='on'
              />
            </div>
            <div className='form-group'>
              <input id='form-login-submit-button' type='submit' className='btn btn-primary' value='Ingresar' />
            </div>
            <div className='form-group form-button'>
                <Link to='/forgot-password' className="align-left">Perdio su Contraseña?</Link>
                <Link to='/customer-register'>Registrarse</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, login })(Login)
