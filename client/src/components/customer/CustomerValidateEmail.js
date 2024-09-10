import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate  } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const CustomerValidateEmail = ({ customer: { customer } }) => {
    
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('load', () => {
            navigate('/');
        });
    }, []);
    
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            // Custom logic to handle the refresh
            // Display a confirmation message or perform necessary actions
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Registro</h1>
                <p className="small2 mt-30">Se envió un link a <strong>{localStorage.getItem('register-email')}</strong> para verificar tu dirección de correo electrónico y así completar el proceso de registración.</p>
                <p className="small2 mb-50">Si el mail no te llega, por favor revisá tu bandeja de 'correo no deseado' o bien hace click en el botón Reenviar</p>
                <Link to={'/trips'} className='btn btn-primary'>
                  <i className='text-primary' /> Volver
                </Link>
                <Link to={'/'} className='btn btn-secondary'>
                    <i className='text-primary' /> Reenviar
                </Link>                
            </section>
        </Fragment >
    );
};

const mapStateToProps = (state) => ({
    customer: state.customer
})

export default connect(mapStateToProps, null)(CustomerValidateEmail);