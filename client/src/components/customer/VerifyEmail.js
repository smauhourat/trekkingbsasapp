import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import api from '../../utils/api'
import Spinner from '../layout/Spinner';

const VerifyEmail = () => {
  const navigate = useNavigate()
  const { id, token } = useParams()
  const [isMailVerified, setIsMailVerified] = useState(false)
  const [messageUser, setMessageUser] = useState('Espere por favor, estamos validando su direccion de email.')

  useEffect(() => {
    const validateEmail = async () => {
      console.log('id =>', id)
      console.log('token =>', token)
      const res = await api.post(`/users/verify-email/${id}/${token}`)
      console.log('res =>', res)
      // if (res.data.status === '200') {
      //   setIsMailVerified(true)
      // }
    }
    validateEmail()
  }, [id, token, isMailVerified])


  return (
    <section className='container'>
      <h1 className='large text-primary'>Validacion Email</h1>
      <p className='lead'>{messageUser}</p>
      {!isMailVerified && <Spinner />}
    </section>
  )


}

export default VerifyEmail