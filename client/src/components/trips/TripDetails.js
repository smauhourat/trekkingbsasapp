import React from 'react'
import { useLocation } from "react-router-dom";
import formatDate from '../../utils/formatDate';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const TripDetails = () => {
    const location = useLocation();
    const trip = location.state?.data;

    console.log(trip?.included_services);

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
                        <p><strong>Salida: </strong>28/04/2023 - 23hs - Liniers</p>
                        <p><strong>Llegada: </strong>01/05/2023 - 20hs - Liniers</p>
                        <p><strong>Disponibilidad: </strong>23 lugares</p>
                        <p><strong>Precio: </strong>${trip?.price} (por persona)</p>
                        <p><strong>Reserva: </strong>${trip?.booking_price} (por persona)</p>
                        <p><strong>Disponibilidad: </strong>{trip?.quota} lugares</p>
                    </div>
                    <div>
                        <h2 className="text-primary">Itinerario</h2>
                        <p>{trip?.itinerary}</p>
                    </div>
                </div>

                <div>
                    <a href="search-result.html" className="btn btn-primary mg-top-1">Volver</a>
                </div>

                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Equipo Sugerido</h2>
                    <div>
                        <p>
                            <strong>Detalle: </strong>{trip?.suggested_equipment}
                        </p>
                    </div>
                    <h2 className="text-primary">Servicios Incluidos</h2>
                    <div>
                        <p>
                            {trip?.included_services}
                        </p>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default TripDetails
