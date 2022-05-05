import React from 'react'
import PropTypes from 'prop-types'

const Image = ({ id, url }) => {
  return (
    <li key={id}>
      <figure>
        {/* <img src={url.replace('upload', 'upload/ar_1.0,c_limit,h_150')} /> */}
        <img src={url} />
        <figcaption><h3><a href={url} target="_blank">tqebqtkibaapsc310hzi</a></h3></figcaption>
      </figure>
      <p>
        formato | tamaño | dimensiones
      </p>
      <hr />
      <button class="btn btn-danger m">
        <i class="fas fa-trash-alt" title="Eliminar"></i>
      </button>              
    </li>
  )
}

Image.propTypes = {

}

export default Image;
