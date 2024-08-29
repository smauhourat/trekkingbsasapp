import api from '../utils/api';
import { setAlert } from './alert';

import {
  BOOK_CLEAR,
  BOOK_GET,
  BOOK_ERROR,
  BOOK_GETLIST
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

// Get books by customer
export const getBooks = (customerId) => async (dispatch) => {
  dispatch({ type: BOOK_CLEAR });
  try {
    const res = await api.get(`/books/by-customer/${customerId}`);
    console.log(res.data);
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