import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate, useParams  } from 'react-router-dom'
import { connect } from 'react-redux';

const CustomerValidateEmail = () => {
    
    const navigate = useNavigate();
    const _email = useParams().email

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
                <p className="small2 mt-30">Se envió un link a <strong>{_email}</strong> para verificar tu dirección de correo electrónico y así completar el proceso de registración.</p>
                <p className="small2 mb-50">Si el mail no te llega, por favor revisá tu bandeja de 'correo no deseado' o bien hace click en el botón Reenviar</p>
                <Link to={'/trips'} className='btn btn-primary'>
                  <i className='text-primary' /> Volver
                </Link>
                <Link to={`/re-validate-email/${_email}`} className='btn btn-secondary'>
                    <i className='text-primary' /> Reenviar
                </Link>                
            </section>
        </Fragment >
    );
};

export default CustomerValidateEmail;