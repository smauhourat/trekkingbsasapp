import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'
import { forgotPassword } from '../../actions/auth'

const ForgotPassword = ({ forgotPassword }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: ''
  })
  const [disableSubmit, setDisableSubmit] = useState(false)

  const { email } = formData
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setDisableSubmit(false)
  }

  const onSubmit = async e => {
    e.preventDefault()
    setDisableSubmit(true)
    forgotPassword(email, navigate)
  }

  return (
    <>
      <section className='container'>
        <h1 className='large text-primary'>Recuperar Contraseña</h1>
        <p className='lead'><i className='fas fa-info-circle' /> Un mail será enviado para la recuperación de la contraseña.</p>
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
          <input id='form-login-submit-button' type='submit' className='btn btn-primary' value='Enviar Mail' disabled={disableSubmit} />
        </form>
      </section>
    </>
  )
}

ForgotPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired
}

export default connect(null, { setAlert, forgotPassword })(ForgotPassword)
