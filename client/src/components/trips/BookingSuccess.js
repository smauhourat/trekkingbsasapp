import React, { useEffect, useState, Fragment } from 'react'
import Spinner from '../layout/Spinner';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBook } from '../../actions/book';
import AccountsInfo from '../child/AccountsInfo'

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
            <div className="bg-body-gray rounded p-5">
                    <h1>Gracias, su reserva fue procesada de forma exitosa!!!</h1>
                    <p className="mt-10">Para completar el proceso, realice la <strong>Transferencia o Deposito</strong> informando el nro. de transaccion al mail ventas@trekkingbuenosaires.com.ar</p>
                    <div className="mt-25"></div>
                    <h2>COD RESERVA: {selectedBook.description}</h2>
                    <div className="mt-25"></div>
                    {selectedBook.accounts.length >= 0 && <AccountsInfo accounts={selectedBook.accounts} />}
                    <Link to='/books' className="btn btn-success mt-15">
                        Ver Reservas
                    </Link>
            </div>            
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