import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { updateCustomer } from '../../actions/customer'
import { dateGetDiffYears, formatDateISOFromDate, formatDateISO } from '../../utils/dateHelper'

const Customer = ({ 
  auth: { user, customer },
  setAlert,
  updateCustomer
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

  const validateForm = () => {

    if (dni.length > 8) {
      setAlert('El campo DNI debe ser de 8 digitos numericos como maximo', 'danger')
      return false
    }

    if (phone.length != 10) {
      setAlert('El campo Telefono debe ser de 10 digitos numericos', 'danger')
      return false
    }

    if (dateGetDiffYears(birth_date, formatDateISOFromDate(new Date())) < 18) {
      setAlert('Debe ser mayor de 18 años para poder registrarse', 'danger')
      return false
    }

    return true
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      updateCustomer(customer._id, formData, navigate)
    }
  }  

  return (
    <section className='container'>
      <h1 className='large text-primary'>Mis Datos</h1>
      <p className='lead'><i className='fas fa-calendar' /> Actualizar datos</p>
      <form className="form" onSubmit={e => onSubmit(e)} >
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        disabled />
                </div>
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        placeholder="Nombre"
                        name="first_name"
                        value={first_name}
                        onChange={onChange}
                        required />
                </div>
                <div className="form-group">
                    <label>Apellido</label>
                    <input
                        type="text"
                        placeholder="Apellido"
                        name="last_name"
                        value={last_name}
                        onChange={onChange}
                        required />
                </div>
                <div className="form-group">
                  <label>DNI</label>
                    <input
                        type="number"
                        placeholder="DNI"
                        name="dni"
                        value={dni}
                        onChange={onChange}
                        required />
                </div>
                <div className="form-group">
                    <label>Teléfono</label>
                    <input
                        type="number"
                        placeholder="Telefono"
                        name="phone"
                        value={phone}
                        onChange={onChange}
                        required />
                    <small className="form-text">
                      <strong>AR (+54) </strong> 11 1234 5678 (diez digitos numericos)
                    </small>
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
                    <label>Estado de Salud</label>
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

Customer.propTypes = {
  setAlert: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { setAlert, updateCustomer })(Customer)