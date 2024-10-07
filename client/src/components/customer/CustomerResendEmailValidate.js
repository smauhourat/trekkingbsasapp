import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { resendEmailValidation } from '../../http/customer'

const CustomerResendEmailValidate = () => {

  const _email = useParams().email
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: _email
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
    resendEmailValidation(email)
    navigate(`/validate-email/${email}`)
    console.log('Call de api to send email, and navigate to confirm')
  }  

  return (
    <>
      <section className='container'>
        <h1 className='large text-primary'>Reenvio mail de confirmacion</h1>
        <p className='lead'><i className='fas fa-info-circle' /> Un mail será enviado para verificar tu dirección de correo electrónico y así completar el proceso de registración.</p>
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

export default CustomerResendEmailValidate