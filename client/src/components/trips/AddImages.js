import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import api from '../../utils/api';
import PropTypes from 'prop-types'

const AddImages = props => {
    const id = useParams().id;
    console.log(id);

    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const navigate = useNavigate();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        //previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            //const image = { image: JSON.stringify({ data: base64EncodedImage })};
            const image = JSON.stringify({ data: base64EncodedImage });
            const res = await api.post(`/trips/${id}/images`, image);
            setFileInputState('');
            //setPreviewSource('');
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        }
    };    

  return (
    <section className="container">
        <h1 className="large text-primary">Trips Images</h1>
        <p className="lead"><i className="fas fa-user"></i> Cargar Imagen</p>
        <form onSubmit={handleSubmitFile} className="form">
        <input
                id="fileInput"
                type="file"
                name="image"
                onChange={handleFileInputChange}
                value={fileInputState}
                className="form-input"
            />
            <button className="btn btn-primary" type="submit">
                Cargar
            </button>
        </form>
    </section>
  )
}

AddImages.propTypes = {

}

export default AddImages;
