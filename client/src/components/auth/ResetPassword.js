import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'
import { resetPassword } from '../../actions/auth'
import api from '../../utils/api'
import validatePassword from '../../utils/validatePassword'

const ResetPassword = ({ setAlert, resetPassword }) => {
  const navigate = useNavigate()
  const { id, token } = useParams()
  const [isTokenVerified, setIsTokenVerified] = useState(true)

  useEffect(() => {
    const validateResetPasswordToken = async () => {
      const res = await api.get(`/auth/reset-password/${id}/${token}`)
      if (res.data.status === 'fail') {
        setIsTokenVerified(false)
      }
    }
    validateResetPasswordToken()
  }, [id, token, isTokenVerified])

  const [formData, setFormData] = useState({
    password: '',
    password2: ''
  })

  const { password, password2 } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()

    if (!validatePassword(password)) {
      setAlert('La Contraseña no es valida', 'danger')
      return
    }

    if (password !== password2) {
      setAlert('La Contraseña y su confirmacion no coinciden', 'danger')
    } else {
      resetPassword(id, token, password, navigate)
    }
  }

  return (
    <>
      <section className='container'>
        <h1 className='large text-primary'>Reseteo Contraseña</h1>
        <p className='lead'><i className='fas fa-user' /> Ingrese los datos solicitados {isTokenVerified}</p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Contraseña'
              name='password'
              value={password}
              onChange={e => onChange(e)}
              minLength='8'
              autoComplete='on'
            />
            <label className='mini'>Debe contener al menos una letra mayuscula, una minuscula, y un simbolo (@$!%*_?&), y un largo minimo de 8 caracteres </label>
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirmacion Contraseña'
              name='password2'
              value={password2}
              onChange={e => onChange(e)}
              minLength='8'
              autoComplete='on'
            />
          </div>
          <input id='form-login-submit-button' type='submit' className='btn btn-primary' value='Resetear' disabled={!isTokenVerified} />
          <div className='form-group'>
            {!isTokenVerified && <p>Lo sentimos el token ha expirado!!!"</p>}
          </div>
        </form>

      </section>
    </>
  )
}

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired
}

export default connect(null, { setAlert, resetPassword })(ResetPassword)
