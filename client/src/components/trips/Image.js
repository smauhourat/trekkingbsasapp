import React from 'react'
import PropTypes from 'prop-types'
import formatBytes from '../../utils/formatBytes';

const Image = ({ img }) => {
  return (
    <li key={img._id}>
      <figure>
        {/* <img src={url.replace('upload', 'upload/ar_1.0,c_limit,h_150')} /> */}
        <img src={img.url} />
        <figcaption><h3><a href={img.url} target="_blank">{img._id}</a></h3></figcaption>
      </figure>
      <p>
        <div className="tiny">
          formato: {img.format} | tamaño: {formatBytes(img.bytes)} | dimensiones {img.width} x {img.height}
        </div>
      </p>
      <hr />
      <button className="btn btn-danger m">
        <i className="fas fa-trash-alt" title="Eliminar"></i>
      </button>              
    </li>
  )
}

Image.propTypes = {

}

export default Image;
