import React, { Fragment, useEffect, useState, useRef } from 'react'
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateBook, getBooks } from '../../actions/book'
import formatDate from '../../utils/formatDate'

const BookList = ({ updateBook, getBooks, book: { books: { data }, loading }, auth }) => {

    const [itemEdited, setItemEdited] = useState({})
    const refs = useRef([])

    const handleInputChange = (e, rowIndex, id) => {
        if (e.target.value !== "")
            setItemEdited({ id: id, value: e.target.value, rowIndex: rowIndex})
        else
            setItemEdited({})
    };

    const showBtnAdd = (rowIndex) => {
        if (itemEdited.rowIndex === rowIndex)
            return true
        return false
    }

    const showBtnEdit = (rowIndex) => {
        if (itemEdited.rowIndex === rowIndex)
            return true
        return false
    }    

    const onAddTransactionNumber = (rowIndex)  => {
        updateBook(itemEdited.id, itemEdited.value)
    }

    const editTransactionNumber = (rowIndex) => {
        setItemEdited({ id: id, value: e.target.value, rowIndex: rowIndex})
        console.log('Edit =>', rowIndex)
    }

    useEffect(() => {
        getBooks(auth.user?._id)
    }, [getBooks, auth.user?._id]);

    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Mis Reservas</h1>
                {loading ? (<Spinner />) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="no-wrap">Codigo</th>
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
                                        <td>{book.code}</td>
                                        <td className="no-wrap">{book.description}</td>
                                        <td>{formatDate(book.createdAt)}</td>
                                        <td>{book.status}</td>
                                        <td>${book.price}</td>
                                        <td>
                                            {book.transaction_number !== undefined ? 
                                            <div className="inline">
                                                {book.transaction_number}
                                                <button
                                                    onClick={() => editTransactionNumber(rowIndex)}
                                                    className='btn btn-success mt-5 width-100'
                                                >
                                                    <i className='fas fa-edit' title='Editar' />
                                                </button>
                                            </div>
                                            
                                            : 
                                            <div className="inline">
                                                    <input type="text" id={book._id} className="input-text-grid" placeholder='comprobante' onChange={(e) => handleInputChange(e, rowIndex, book._id)}></input>
                                                    {showBtnAdd(rowIndex) && 
                                                    <button className='btn btn-primary mt-5 width-100' onClick={() => onAddTransactionNumber(rowIndex)}>ok</button>
                                                    }
                                            </div>}
                                        </td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                )}
            </section>
        </Fragment>
    )
}

BookList.propTypes = {
    updateBook: PropTypes.func.isRequired,
    getBooks: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    book: state.book,
    auth: state.auth
});

export default connect(mapStateToProps, { updateBook, getBooks })(BookList);
