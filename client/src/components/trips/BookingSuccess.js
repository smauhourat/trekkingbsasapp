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
            <div className="bg-body-gray rounded p-5">
                    <h1>Gracias, su reserva fue procesada de forma exitosa!!!</h1>
                    <p className="mt-10">Para completar el proceso, realice la <strong>Transferencia o Deposito</strong> informando el nro. de transaccion al mail ventas@trekkingbuenosaires.com.ar</p>
                    <div className="mt-25"></div>
                    <h2>COD RESERVA: {selectedBook.description}</h2>
                    <div className="mt-25"></div>
                    <div className="fit-content bg-body-gray-500 rounded p-5">
                    {selectedBook.accounts.map((account) => {
                      return (
                          <>
                            <h3>{account.bank}</h3>
                            <p>{account.account_type} - {account.currency} Nro {account.account_number}</p>
                            <p>CBU: <strong>{account.account_cbu}</strong></p>
                            <p>Aias: <strong>{account.account_alias}</strong></p>
                            <div className="mt-15"></div>
                          </>
                      )
                    })}
                    </div>
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