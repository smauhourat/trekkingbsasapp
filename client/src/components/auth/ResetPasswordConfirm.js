import React, { Fragment } from "react";
import { connect } from 'react-redux';

const ResetPasswordConfirm = () => {
    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Fin Proceso</h1>
                <p className="lead">La contraseña se ha cambiado con exito.</p>
            </section>
        </Fragment >
    );
};

export default connect()(ResetPasswordConfirm);