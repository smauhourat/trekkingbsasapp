import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import api from '../utils/api';

const AddImage = props => {
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
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            //setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            // await fetch('/api/upload', {
            //     method: 'POST',
            //     body: JSON.stringify({ data: base64EncodedImage }),
            //     headers: { 'Content-Type': 'application/json' },
            // });
            const image = { data: JSON.stringify({ data: base64EncodedImage })};
            const res = await api.post(`/trips/${props.id}`, image);
            setFileInputState('');
            setPreviewSource('');
            navigate('/dashboard');
            //setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            //setErrMsg('Something went wrong!');
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
            <button className="btn" type="submit">
                Submit
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

AddImage.propTypes = {

}

export default AddImage;
