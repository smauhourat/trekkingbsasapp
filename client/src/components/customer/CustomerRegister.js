import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { addCustomer } from '../../actions/customer';

const CustomerRegister = ({ setAlert, addCustomer }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        dni: '',
        phone: '',
        birth_date: '',
        medical_status: '',
        password: '',
        password2: ''
    });

    const { first_name, last_name, email, dni, phone, birth_date, medical_status, password, password2 } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('La Constraseña y la confirmacion no coinciden', 'danger')
            return
        }
        addCustomer({ first_name, last_name, email, dni, phone, birth_date, medical_status, password }, navigate);
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Registro</h1>
            <p className="lead">Por favor complete los siguientes campos</p>
            <form className="form" onSubmit={e => onSubmit(e)} >
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required />
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
                    <label>Fecha</label>
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
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Contraseña'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        autoComplete='on' />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={onChange} />
                </div>
                
                <input type="submit" className="btn btn-primary" value="Aceptar" />
                <input type="button" className="btn btn-secondary" value="Cancelar" onClick={() => navigate('/')} />
            </form>
        </section>
    )
}

CustomerRegister.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addCustomer: PropTypes.func.isRequired
};

export default connect(null, { setAlert, addCustomer })(CustomerRegister);