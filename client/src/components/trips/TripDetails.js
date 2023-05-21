import React from 'react'
import { useLocation, Link } from "react-router-dom";
import formatDate from '../../utils/formatDate';
import formatDateISOFromDate from '../../utils/formatDateISOFromDate';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import training_levels from '../../models/TrainingLevel.json';

const TripDetails = () => {
    const location = useLocation();
    const trip = location.state?.data;
    const currentDate = new Date();

    const training_level_description = training_levels.training_levels.filter(function (el) {
        return el.name === trip.training_level;
    });

    const images3 = trip.images.map((img) => {
        return ({
            original: img.url.toString().replace('http:', 'https:')
        })
    });

    return (
        <section className="container">
            <div className="profile-grid my-1">
                <div className="profile-top p-2">
                    <h1 className="medium mg-top-1">{trip.title}</h1>
                    <p className="small">{trip.subtitle}</p>
                    {images3.length > 0 && <ImageGallery items={images3} />}
                </div>
                <div className="profile-about bg-light p-2">
                    <p>
                        {trip.description}
                    </p>
                    <div className="line"></div>
                </div>

                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Datos Importantes</h2>
                    <div>
                        <h3 className="text-dark">Lugar</h3>
                        <p className="highlight2">{trip?.location}</p>
                        <h3 className="text-dark">Fecha</h3>
                        <p className="highlight2">{formatDate(trip.date)}</p>
                        <p>&nbsp;</p>
                        <p><strong>Duración: </strong>{trip?.duration}</p>
                        <p><strong>Nivel: </strong>{trip?.training_level} <span className="footnote">({training_level_description[0]?.description})</span></p>
                        <p><strong>Salida: </strong>{trip?.departure}</p>
                        <p><strong>Llegada: </strong>{trip?.arrival}</p>
                        <p><strong>Disponibilidad: </strong>{trip?.quota - trip?.reservations} lugares</p>
                        <p><strong>Precio: </strong>${trip?.price} (por persona)</p>
                        <p><strong>Precio Reserva: </strong>${trip?.booking_price} (por persona)</p>

                    </div>
                    <div>
                        <h2 className="text-primary">Itinerario</h2>
                        <p>{trip?.itinerary}</p>
                    </div>
                </div>

                <div>
                    <Link to={'/trips'} state={{ data: trip }} className='btn btn-primary'>
                        <i className='text-primary' /> Volver
                    </Link>
                    {trip?.payment_link && ((trip?.quota - trip?.reservations) > 0) && (formatDateISOFromDate(trip.date) >= formatDateISOFromDate(currentDate)) && (
                        <a href={trip.payment_link} target="_blank" rel="noreferrer" className='btn btn-success'>
                            <i className='text-primary' /> Reservar
                        </a>
                    )}
                </div>

                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Equipo Sugerido</h2>
                    <div>
                        <p>
                            <strong>Detalle: </strong>{trip?.suggested_equipment}
                        </p>
                    </div>
                    {trip?.included_services && (
                        <>
                            <h2 className="text-primary">Servicios Incluidos</h2>
                            <div>
                                <p>
                                    {trip?.included_services}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default TripDetails
