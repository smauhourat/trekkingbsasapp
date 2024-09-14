import React, { useEffect, useState, Fragment } from 'react'
import Spinner from '../layout/Spinner';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBook } from '../../actions/book';

const BookingSuccess = ({
    getBook,
    book: { selectedBook, loading }
}) => {

    const id = useParams().id
    
    useEffect(() => {
        getBook(id);
      }, [getBook, id]);
    
      return (
        <section className="container">
          {loading || selectedBook === undefined || JSON.stringify(selectedBook) === '{}' ? (<Spinner />) : (
            <>
                <h1>Gracias, su reserva fue procesada de forma exitosa!!!</h1>
                <h3>Para completar el proceso, realice la Transferencia o Deposito informando el nro. de transaccion al mail ventas@trekkingbuenosaires.com.ar</h3>
                <div className="mt-25"></div>
                <h2>COD RESERVA: {selectedBook.description}</h2>
                <Link to='/books' className="btn btn-success">
                    Ver Reservas
                </Link>
            </>
          )}
        </section>
      );    
}

BookingSuccess.propTypes = {
    getBook: PropTypes.func.isRequired,
  }
  
  const mapStateToProps = (state) => ({
    book: state.book
  });
 

export default connect(mapStateToProps, { getBook })(BookingSuccess);