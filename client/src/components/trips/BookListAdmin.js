import React, { Fragment, useEffect, useState, useRef } from 'react'
import Spinner from '../layout/Spinner';
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateBook, getBooksByTrip } from '../../actions/book'
import { getTrip } from '../../actions/trip'
import formatDate from '../../utils/formatDate'

const BookListAdmin = ({ updateBook, getTrip, getBooksByTrip, trip: { selectedTrip }, book: { books: { data }, loading }, auth }) => {

    const [itemEdited, setItemEdited] = useState({})
    const { id } = useParams()
    console.log('tripId => ', id)

    const handleInputChange = (e, rowIndex, id) => {
        if (e.target.value !== "")
            setItemEdited({ id: id, value: e.target.value, rowIndex: rowIndex})
        else
            setItemEdited({ id: id, value: "", rowIndex: rowIndex })
        // console.log(itemEdited)
    };

    const showBtnAdd = (rowIndex) => {
        if (itemEdited.rowIndex === rowIndex)
            return true
        return false
    }

    const onAddTransactionNumber = (rowIndex)  => {
        updateBook(itemEdited.id, itemEdited.value)
        setItemEdited({})
    }

    const getCssStatusColor = (status) => {
        switch (status) {
            case 'pendiente':
                return 'bg-danger-light p-05'
            case 'procesando':
                return 'bg-warning-light p-05'
            case 'aceptada':
                return 'bg-success-light p-05'
        }
    }

    useEffect(() => {
      getTrip(id)
      // console.log('tripId XXX => ', id)
      getBooksByTrip(id)
    }, [getBooksByTrip, getTrip, id]);

    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Reservas</h1>
                {loading ? (<Spinner />) : (
                    <>
                    <p className='lead p-1'>
                            <i className='fas fa-info' /> {data[0].trip.title} - {formatDate(data[0].trip.date)}
                    </p>                    
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="no-wrap">Codigo</th>
                                <th className="no-wrap">Cliente</th>
                                <th className="no-wrap">Descripcion</th>
                                <th className="no-wrap">Fecha</th>
                                <th className="no-wrap">Estado</th>
                                <th className="no-wrap">Precio</th>
                                <th className="no-wrap">Comprobante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((book, rowIndex) => {
                                return (
                                    <tr key={rowIndex} className="yellow">
                                        <td>
                                            <Link to={`/trip-details/${book.trip._id}`}>
                                                {book.code}
                                            </Link>
                                        </td>
                                        <td className="no-wrap">
                                          {book.customer.last_name}, {book.customer.first_name}
                                        </td>
                                        <td>
                                            {book.description}
                                        </td>
                                        <td>{formatDate(book.createdAt)}</td>
                                        <td>
                                            <div className={getCssStatusColor(book.status)}>
                                                {book.status}
                                            </div>
                                        </td>
                                        <td>${book.price}</td>
                                        <td>
                                            {
                                            <div className="inline">
                                                {book.status !== 'aceptada' ?
                                                <input type="text" 
                                                    id={book._id} 
                                                    className="input-text-grid" 
                                                    value={(itemEdited.rowIndex === rowIndex) ? itemEdited.value : book.transaction_number}
                                                    placeholder='' 
                                                    onChange={(e) => handleInputChange(e, rowIndex, book._id)}>
                                                </input>
                                                :
                                                book.transaction_number
                                                }
                                                {
                                                    showBtnAdd(rowIndex) && 
                                                    <button className='btn btn-success mt-5 width-100' onClick={() => onAddTransactionNumber(rowIndex)}>ok</button>
                                                }
                                            </div>}
                                        </td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                    </>
                )}
            </section>
        </Fragment>
    )
}

BookListAdmin.propTypes = {
    updateBook: PropTypes.func.isRequired,
    getBooksByTrip: PropTypes.func.isRequired,
    getTrip: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    book: state.book,
    auth: state.auth,
    trip: state.trip
});

export default connect(mapStateToProps, { updateBook, getTrip, getBooksByTrip })(BookListAdmin);
