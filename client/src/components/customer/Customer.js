import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import formatDateISO from '../../utils/formatDateISO'

const Customer = ({ 
  auth: { user, customer },
}) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      dni: '',
      phone: '',
      birth_date: '',
      medical_status: ''
  });

  useEffect(() => {
    console.log('useEffect()')
    console.log('customer =>', customer)
    console.log('user =>', user)
    setFormData({ 
      email: user.email, 
      first_name: customer.first_name, 
      last_name: customer.last_name,
      dni: customer.dni,
      phone: customer.phone,
      birth_date: formatDateISO(customer.birth_date),
      medical_status: customer.medical_status
    })
  }, [])  

  const { first_name, last_name, email, dni, phone, birth_date, medical_status } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className='container'>
      <h1 className='large text-primary'>Mis Datos</h1>
      <p className='lead'><i className='fas fa-calendar' /> Actualizar datos</p>
      <form className="form" onSubmit={e => onSubmit(e)} >
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        disabled />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Nombre"
                        name="first_name"
                        value={first_name}
                        onChange={onChange}
                        required />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Apellido"
                        name="last_name"
                        value={last_name}
                        onChange={onChange}
                        required />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="DNI"
                        name="dni"
                        value={dni}
                        onChange={onChange}
                        required />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Telefono"
                        name="phone"
                        value={phone}
                        onChange={onChange}
                        required />
                </div>
                <div className="form-group">
                    <label>Fecha Nacimiento</label>
                    <input
                        type="date"
                        placeholder="Fecha Nacimiento"
                        name="birth_date"
                        value={birth_date}
                        onChange={onChange}
                        required />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Estado de Salud"
                        name="medical_status"
                        value={medical_status}
                        onChange={onChange} />
                </div>
               
                <input type="submit" className="btn btn-primary" value="Aceptar" />
                <input type="button" className="btn btn-secondary" value="Cancelar" onClick={() => navigate('/')} />
            </form>
    </section>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Customer)