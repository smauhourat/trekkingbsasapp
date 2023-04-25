import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types'
import ImagesList from './ImagesList';
import Spinner from '../layout/Spinner';
import { addImage } from '../../actions/trip';
import imageFileIsValid from '../../utils/imageFileIsValid';

const AddImages = ({ addImage, setAlert, loading }) => {
    const id = useParams().id;
    const [fileInput, setFileInput] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [fileLoaded, setFileLoaded] = useState(false);

    const navigate = useNavigate();

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        setFileInput(e.target.value);

        const { status, message } = await imageFileIsValid(file);
        console.log('status: ', status);
        if (status) {
            showPreviewFile(file);
            setSelectedFile(file);
            setFileLoaded(true);
        } else {
            setAlert(message, 'danger');
        }
    };

    const showPreviewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = async (e) => {
        e.preventDefault();

        if (!selectedFile) return;

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = (err) => {
            console.error('Error leyendo el archivo: ' + err.target.error.code);
            setAlert('Error cargando imagen', 'danger');
        };
    };

    const cleanLoadedFile = () => {
        setFileInput('');
        setPreviewSource('');
        setSelectedFile();
    }

    const uploadImage = async (base64EncodedImage) => {
        try {
            const image = JSON.stringify({ data: base64EncodedImage });
            addImage(id, image);
            cleanLoadedFile();
        } catch (err) {
            console.error(err);
            setAlert('Error cargando imagen', 'danger');
        }
    };

    return (
        <section className="container">
            <h1 className="large text-primary">Imagenes del Evento</h1>
            <p className="lead"><i className="fas fa-user"></i> Cargar Imagen</p>
            <form onSubmit={handleSubmitFile} className="form">

                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <label htmlFor="fileInput" className="btn btn-success btn-link no-wrap">
                            <i className="fas fa-cloud-upload-alt"></i> Seleccione una Imagen
                        </label>
                        <div className="inline">
                            <input id="fileInput" type="file" name="image" accept="image/*" onChange={handleFileInputChange} value={fileInput} />
                            <input className="btn btn-primary" type="submit" disabled={!fileLoaded} value="Aceptar" />
                            <input type="button" className="btn btn-secondary" value="Cancelar" onClick={() => navigate('/dashboard')} />
                        </div>
                    </>
                )}
            </form>
            {previewSource && (
                <div>
                    <div className="my-1"></div>
                    <div className="card-load">
                        <figure>
                            <img
                                src={previewSource}
                                alt="seleccionada"
                            />
                        </figure>
                    </div>
                </div>
            )}

            <hr className="my-2" />
            <ImagesList tripId={id} />
        </section>
    )
}

AddImages.propTypes = {
    addImage: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    loading: state.trip.loading
});

export default connect(mapStateToProps, { addImage, setAlert })(AddImages);