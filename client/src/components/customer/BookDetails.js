import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import { useParams, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBook } from '../../actions/book';

const BookDetails = ({
  getBook,
  auth: { isAuthenticated },
  book: { selectedBook, loading }
}) => {

  const id = useParams().id;

  useEffect(() => {
    getBook(id);
  }, [getBook, id]);

  return (
    <section className="container">
      {loading || selectedBook === undefined ? (<Spinner />) : (
        <>
          <hr />
          <h1>Nro Reserva: {selectedBook?.description}</h1>
          <hr />
          <h2>Descripcion: {selectedBook?.description}</h2>
          <h2>Fecha: {selectedBook?.date}</h2>
          <h2>Estado: {selectedBook?.status}</h2>
          <h2>Precio: ${selectedBook?.price}</h2>
          <h2>Forma de Pago: {selectedBook.payment_operation_type}</h2>
          <hr />
          <br />
          <Link to='/books' className="btn btn-success">
            Ver Reservas
          </Link>
        </>
      )}
    </section>
  );
}

BookDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  getBook: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  book: state.book
});

export default connect(mapStateToProps, { getBook })(BookDetails);
