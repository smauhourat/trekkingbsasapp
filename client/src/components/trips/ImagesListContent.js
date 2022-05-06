import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { deleteImage } from '../../actions/trip';
import formatBytes from "../../utils/formatBytes";

const ImagesListContent = ({trip: {selectedTrip}, deleteImage}) => {
    const imagesList = 
        selectedTrip?.images?.map((img) => (
            <li key={img._id}>
                <figure>
                    <img src={img.url} />
                    <figcaption><h3><a href={img.url} target="_blank">{img.public_id}</a></h3></figcaption>
                </figure>
                <p>
                    <div className="tiny">
                        formato: {img.format} | tamaño: {formatBytes(img.bytes)} | dimensiones {img.width} x {img.height}
                    </div>
                </p>
                <hr />
                <button
                    onClick={() => deleteImage(selectedTrip._id, img.public_id)}
                    className="btn btn-danger m"
                >
                    <i className="fas fa-trash-alt" title="Eliminar"></i>
              </button>
            </li>
        ));

    return <>{imagesList}</>
}

ImagesListContent.propTypes = {
    deleteImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    trip: state.trip
  });


export default connect(mapStateToProps, { deleteImage })(ImagesListContent);