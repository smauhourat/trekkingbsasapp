import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types'

const ContactForm = props => {
    const navigate = useNavigate();

    return (
        <div>
            <section className="container">
                <h1 className="large text-primary">
                Contacto
                </h1>
                <p className="lead">
                    <i className="fas fa-hand-point-right"></i> En que podemos ayudarte?
                </p>
                <form className="form">
                    <div className="form-group">
                    <input type="text" placeholder="Nombre" name="title" required />
                    </div>
                    <div className="form-group">
                    <input type="text" placeholder="Email" name="email" required />
                    </div>
                    <div className="form-group">
                    <input type="text" placeholder="Asunto" name="subject" />
                    </div>
                    <div className="form-group">
                    <textarea
                        name="message"
                        cols="30"
                        rows="5"
                        placeholder="Mensaje"
                    ></textarea>
                    </div>
                    <input type="submit" className="btn btn-primary my-1" />
                    <input type="button" className="btn btn-light my-1" value="Volver" onClick={() => navigate('/')} />
                </form>
            </section>
            
            <div className="footer-basic bg-dark">
                <footer>
                    <div className="social"><a href="#"><i className="fab fa-instagram"></i></a><a href="#"><i className="fab fa-facebook-f"></i></a><a href="#"><i className="fab fa-twitter"></i></a><a href="#"><i className="fab fa-youtube"></i></a></div>
                    <ul className="list-inline">
                        <li className="list-inline-item"><Link to="/">Home</Link></li>
                        <li className="list-inline-item"><a href="#">Calendario</a></li>
                        <li className="list-inline-item"><a href="#">La Empresa</a></li>
                        <li className="list-inline-item"><Link to="/contact">Contacto</Link></li>
                    </ul>
                    <p className="copyright">©TrekkingBsAs 2022 - Todos los Derechos Reservados</p>
                    <p className="copyright text-dark"><strong>Desarrollado por <a href="http://www.adhentux.com" target="_blank">Adhentux</a></strong></p>
                </footer>
            </div>
        </div>
    )
}

ContactForm.propTypes = {

}

export default ContactForm
