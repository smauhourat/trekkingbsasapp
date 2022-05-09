import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types'
import ImagesList from './ImagesList';
import { addImage } from '../../actions/trip';

const AddImages = ({ addImage, setAlert }) => {
    const id = useParams().id;
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const navigate = useNavigate();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };    

    const handleSubmitFile = (e) => {
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

    const uploadImage = async (base64EncodedImage) => {
        try {
            const image = JSON.stringify({ data: base64EncodedImage });
            addImage(id, image);
            setFileInputState('');
            setPreviewSource('');
            setSelectedFile();
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
            <label  htmlFor="fileInput" className="btn btn-success btn-link no-wrap">
                <i className="fas fa-cloud-upload-alt"></i> Seleccione una Imagen
            </label>
            <input id="fileInput" type="file" name="image" onChange={handleFileInputChange} value={fileInputState}/>            
            <button className="btn btn-primary" type="submit">
                Aceptar
            </button>
            <input type="button" className="btn btn-secondary" value="Cancelar" onClick={() => navigate('/dashboard')} />
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
        
        <hr className="my-2"/>
        <ImagesList tripId={id} />   
    </section>
  )
}

AddImages.propTypes = {
    addImage: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

export default connect(null, { addImage, setAlert })(AddImages);