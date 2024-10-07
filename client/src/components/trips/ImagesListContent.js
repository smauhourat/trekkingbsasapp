import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteImage } from '../../actions/trip'
import formatBytes from '../../utils/formatBytes'

const ImagesListContent = ({ trip: { selectedTrip }, deleteImage }) => {
  const imagesList =
        selectedTrip?.images?.map((img) => (
          <li key={img._id}>
            <figure>
              <img src={img.url} alt={`Trip ${img._id}`} />
              <figcaption><h3><a href={img.url} target='_blank' rel='noreferrer'>{img.public_id}</a></h3></figcaption>
            </figure>
            <p>
              <span className='tiny'>
                formato: {img.format} | tamaño: {formatBytes(img.bytes)} | dimensiones {img.width} x {img.height}
              </span>
            </p>
            <div>
              <hr />
              <button
                onClick={() => deleteImage(selectedTrip._id, img.public_id)}
                className='btn btn-danger m'
                >
                <i className='fas fa-trash-alt' title='Eliminar' />
              </button>
            </div>
          </li>
        ))

  return <>{imagesList}</>
}

ImagesListContent.propTypes = {
  deleteImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  trip: state.trip
})

export default connect(mapStateToProps, { deleteImage })(ImagesListContent)
