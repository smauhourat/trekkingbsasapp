import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBook } from '../../actions/book';
import { setAlert } from '../../actions/alert';

const BookDetails = ({ getBook, setAlert, book: {selectedBook} }) => {

  const id = useParams().id;

  useEffect(() => {
    getBook(id);
  }, [getBook, id]);

  return (
    <section className="container">
      <h1>Anduvo todo bien</h1>
      {selectedBook?.description}
    </section>
  );
}

BookDetails.propTypes = {
  getBook: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  book: state.book
});

export default connect(mapStateToProps, { getBook, setAlert })(BookDetails);
