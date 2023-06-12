import {
  BOOK_CLEAR,
  BOOK_GETALL,
  BOOK_GET,
  BOOK_ERROR,
  BOOK_GETLIST,
} from '../actions/types';

const initialState = {
  loading: true,
  books: [],
  selectedBook: {},
  error: {}
};

export default function book(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BOOK_GETALL:
      return {
        ...state,
        books: payload,
        loading: false
      };
    case BOOK_CLEAR:
      return {
        ...state,
        books: [],
        loading: true,
      };
    case BOOK_GET:
      return {
        ...state,
        selectedBook: payload,
        loading: false
      };
    case BOOK_GETLIST:
      return {
        ...state,
        books: payload,
        selectedBook: {},
        loading: false
      }
    case BOOK_ERROR:
      return {
        ...state,
        error: payload,
        selectedBook: {},
        loading: false,
      };
    default:
      return state;
  }
}