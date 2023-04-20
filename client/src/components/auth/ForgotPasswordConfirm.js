import React, { Fragment } from "react";
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const ForgotPasswordConfirm = () => {
    const { email } = useParams();
    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Recuperar Contraseña</h1>
                <p className="lead">Se ha enviado un mail a <i>{email}</i> con el link para continuar con el proceso de recuperación de la contraseña</p>
            </section>
        </Fragment >
    );
};

export default connect()(ForgotPasswordConfirm);