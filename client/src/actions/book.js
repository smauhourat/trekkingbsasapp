import api from '../utils/api';
import { setAlert } from './alert';

import {
  BOOK_CLEAR,
  BOOK_GET,
  BOOK_ERROR,
  BOOK_GETLIST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL

} from './types';

export const getBook = (id) => async (dispatch) => {
  dispatch({ type: BOOK_CLEAR });
  try {
    const res = await api.get(`/books/${id}`);
    dispatch({
      type: BOOK_GET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const updateBook = (id, transactionNumber) => async (dispatch) => {
  try {
    const res = await api.post(`/books/${id}/payment`, { transaction_number: transactionNumber })
    console.log('res en el action =>', res)
    dispatch({
      type: BOOK_UPDATE_SUCCESS,
      payload: res.data
    })
  
    dispatch(setAlert('Nro de Transaccion agregado a la Reserva', 'success'))    
  } catch (err) {
    console.log(err)
    // const errors = err.response.data.errors

    // if (errors) {
    //   if (Array.isArray(errors)) {
    //     errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    //   }
    // } else {
    //   dispatch(setAlert(err.msg, 'danger'))
    // }

    // dispatch({
    //   type: BOOK_UPDATE_FAIL,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // })
  }
}

// Get books by customer
export const getBooks = (customerId) => async (dispatch) => {
  // dispatch({ type: BOOK_CLEAR });
  try {
    const res = await api.get(`/books/by-customer/${customerId}`);
    // console.log(res.data);
    dispatch({
      type: BOOK_GETLIST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
}

// Get books by trip
export const getBooksByTrip = (tripId) => async (dispatch) => {
  // dispatch({ type: BOOK_CLEAR });
  try {
    const res = await api.get(`/books/by-trip/${tripId}`);
    // console.log(res.data);
    dispatch({
      type: BOOK_GETLIST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
}