import React, { Fragment, useEffect } from 'react'
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getBooks } from '../../actions/book'

const BookList = ({ getBooks, book: { books: { data }, loading }, auth }) => {

    useEffect(() => {
        // OJOOO
        // console.log(auth.user)
        getBooks(auth.user?._id);
    }, [getBooks]);

    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Mis Reservass</h1>
                {loading ? (<Spinner />) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="no-wrap">Codigo</th>
                                <th className="no-wrap">Descripcion</th>
                                <th className="no-wrap">Fecha</th>
                                <th className="no-wrap">Estado</th>
                                <th className="no-wrap">Precio</th>
                                <th className="no-wrap">Forma de Pago</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((book) => {
                                return (
                                    <tr key={book._id}>
                                        <td>RES{book._id.substring(19, 25)}</td>
                                        <td className="no-wrap">{book.description}</td>
                                        <td>{book.date}</td>
                                        <td>{book.status}</td>
                                        <td>${book.price}</td>
                                        <td>{book.payment_operation_type}</td>
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
    getBooks: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    book: state.book,
    auth: state.auth
});

export default connect(mapStateToProps, { getBooks })(BookList);
