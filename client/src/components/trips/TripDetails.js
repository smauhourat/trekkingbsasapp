import React from 'react'
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate';

const TripDetails = (props) => {
    const location = useLocation();
    const trip = location.state?.data;

    const images = trip.images.map((img) => {
        return (
            <li key={img._id}><img src={img.url} style={{maxWidth: '100%',height: '100%'}} /></li>
        )
    })

  return (
    <section className="container">
        <div className="profile-grid my-1">
            <div className="profile-top p-2">
                <h1 className="medium mg-top-1">{trip.title}</h1>
                <p className="small">{trip.subtitle}</p>
                <div className="slider-item-show2 swiffy-slider slider-item-ratio slider-item-ratio-16x9 slider-nav-animation slider-nav-animation-fadein slider-nav-animation-scale slider-item-first-visible" id="swiffy-animation">
                    <ul className="slider-container">
                        {images}
                    </ul>
                    <button type="button" className="slider-nav"></button>
                    <button type="button" className="slider-nav slider-nav-next"></button>
                    <div className="slider-indicators">
                        <button className="active"></button>
                        <button></button>
                        <button></button>
                    </div>
                </div>
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
                    <h3 className="text-dark">Fecha</h3>
                    <p>{formatDate(trip.date)}</p>
                    <p><strong>Lugar: </strong>{trip?.location}</p>
                    <p><strong>Duración: </strong>{trip?.duration}</p>
                    <p><strong>Disponibilidad: </strong>{trip?.quota} lugares</p>
                    <p><strong>Precio: </strong>${trip?.price} (por persona)</p>
                </div>
                <div>
                    <h3 className="text-dark">Recomendaciones</h3>
                    <p><i className="fa fa-check"></i> LLevar calzado cómodo pero resistente.</p>
                    <p><i className="fa fa-check"></i> Abrigo en capas.</p>
                    <p><i className="fa fa-check"></i> Gorra.</p>
                    <p><i className="fa fa-check"></i> Agua para consumo personal.</p>
                    <p><strong>Position: </strong>Systems Admin</p>
                    <p>
                    <strong>Description: </strong>Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
                    ipsam, sapiente suscipit dicta eius velit amet aspernatur
                    asperiores modi quidem expedita fugit.
                    </p>
                </div>
            </div>

            <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Equipo Sugerido</h2>
                <div>
                    <p>
                    <strong>Detalle: </strong>{trip.suggested_equipment}
                    </p>
                </div>
            </div>


        </div>
    </section>
  )
}

TripDetails.propTypes = {

}

export default TripDetails
