import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import api from '../../utils/api';
import PropTypes from 'prop-types'

const AddImages = ({setAlert}) => {
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
            const res = await api.post(`/trips/${id}/images`, image);
            setFileInputState('');
            setPreviewSource('');
            setAlert('Imagen cargada', 'success');
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setAlert('Error cargando imagen', 'danger');
        }
    };    

  return (
    <section className="container">
        <h1 className="large text-primary">Trips Images</h1>
        <p className="lead"><i className="fas fa-user"></i> Cargar Imagen</p>
        <form onSubmit={handleSubmitFile} className="form">

        <label for="fileInput" className="btn btn-secondary btn-link">
            <i class="fas fa-cloud-upload-alt"></i> Seleccione una Imagen
        </label>
        <input id="fileInput" type="file" name="image" onChange={handleFileInputChange} value={fileInputState}/>            

        {/* <input
                id="fileInput"
                type="file"
                name="image"
                onChange={handleFileInputChange}
                value={fileInputState}
                className="form-input"
            /> */}
            <button className="btn btn-primary" type="submit">
                Aceptar
            </button>
        </form>
        {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}        
    </section>
  )
}

AddImages.propTypes = {
    setAlert: PropTypes.func.isRequired,
  };

export default connect(null, { setAlert })(AddImages);