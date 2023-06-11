import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBook } from '../../actions/book';
import { setAlert } from '../../actions/alert';

const BookDetails = ({ getBook, setAlert, book: { selectedBook } }) => {

  const id = useParams().id;

  useEffect(() => {
    getBook(id);
  }, [getBook, id]);

  return (
    <section className="container">
      
    </section>
  );
}

BookDetails.propTypes = {
  getTrip: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  trip: state.trip
});

export default connect(mapStateToProps, { getBook, setAlert })(BookDetails);
