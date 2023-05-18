import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import api from '../../utils/api'
import PropTypes from 'prop-types'
import Recaptcha from 'react-recaptcha';

const ContactForm = ({ setAlert }) => {
    const navigate = useNavigate();

    console.log('REACT_APP_RECAPTCHA_KEY', process.env.REACT_APP_RECAPTCHA_KEY)
    console.log('REACT_APP_RECAPTCHA_SECRET', process.env.REACT_APP_RECAPTCHA_SECRET)

    const [formData, setFormData] = useState({
        title: '',
        email: '',
        subject: '',
        message: ''
    });

    const { title, email, subject, message } = formData;

    const [isVerified, setIsVerified] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const reRef = useRef();

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const resetForm = () => {
        setFormData({
            title: '',
            email: '',
            subject: '',
            message: ''
        });
        reRef.current.reset();
        setIsVerified(false);
    }

    const onLoadRecaptcha = () => {
        //console.log('onLoadRecaptcha');
        //console.log('isVerified1: ', isVerified);
    }

    const verifyRecaptcha = () => {
        //console.log('verifyRecaptcha');
        setIsVerified(true);
        //console.log('isVerified2: ', isVerified);
    }

    const sendContactForm = async (formData) => {

        if (!isVerified) {
            setAlert('Debe verificar el captcha', 'danger');
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await api.post('/contact', formData);
            if (res.data.status === 'success') {
                setAlert('Mensaje enviado', 'success');
                resetForm();
                console.log('Mensaje enviado');
            } else {
                setAlert('Mensaje erroneo', 'danger');
            }
        } catch (err) {
            setAlert('Mensaje erroneo', 'danger');
            console.error(err);
        }
        setIsSubmitting(false);
    }

    return (
        <div>
            <section className="container">
                <h1 className="large text-primary">
                    Contacto
                </h1>
                <p className="lead">
                    <i className="fas fa-hand-point-right"></i> En que podemos ayudarte?
                </p>
                <form
                    className="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendContactForm(formData);
                    }}
                >
                    <div className="form-group">
                        <input type="text" placeholder="Nombre" name="title" value={title} onChange={onChange} required autoFocus />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Email" name="email" value={email} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Asunto" name="subject" value={subject} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="message"
                            cols="30"
                            rows="5"
                            placeholder="Mensaje"
                            value={message}
                            onChange={onChange}
                        ></textarea>
                    </div>
                    <Recaptcha
                        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                        render="explicit"
                        ref={reRef}
                        verifyCallback={verifyRecaptcha}
                        onloadCallback={onLoadRecaptcha}
                    />
                    <input type="submit" className="btn btn-primary my-1" value={isSubmitting ? 'Enviando' : 'Enviar'} disabled={!isVerified || isSubmitting} />
                    <input type="button" className="btn btn-light my-1" value="Volver" onClick={() => navigate('/')} />
                </form>
            </section>

            <div className="footer-basic bg-dark">
                <footer>
                    <div className="social"><a href="https://www.instagram.com/trekking.buenosaires/"><i className="fab fa-instagram"></i></a><a href="https://www.facebook.com/groups/495684924569365"><i className="fab fa-facebook-f"></i></a><a href="https://twitter.com/trekkingbsas"><i className="fab fa-twitter"></i></a><a href="http://www.youtube.com/trekkingbsas"><i className="fab fa-youtube"></i></a></div>
                    <ul className="list-inline">
                        <li className="list-inline-item"><Link to="/">Home</Link></li>
                        <li className="list-inline-item"><Link to="/calendar">Calendario</Link></li>
                        <li className="list-inline-item"><Link to="/company">Nuestro Grupo</Link></li>
                        <li className="list-inline-item"><Link to="/contact">Contacto</Link></li>
                    </ul>
                    <p className="copyright">©TrekkingBsAs 2023 - Todos los Derechos Reservados</p>
                    <p className="copyright text-dark"><strong>Desarrollado por <a href="http://www.adhentux.com" rel="noreferrer" target="_blank">Adhentux</a></strong></p>
                </footer>
            </div>
        </div>
    )
}

ContactForm.propTypes = {
    setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(ContactForm);