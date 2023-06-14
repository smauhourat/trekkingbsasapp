import React, { Fragment } from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

const CustomerValidateEmail = () => {
    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Validación Email</h1>
                <p className="lead">Se ha enviado un mail con el link para continuar con el proceso de registración.</p>
                <Link to={'/trips'} className='btn btn-primary'>
                  <i className='text-primary' /> Volver
                </Link>                
            </section>
        </Fragment >
    );
};

export default connect()(CustomerValidateEmail);