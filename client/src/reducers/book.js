import {
  BOOK_CLEAR,
  BOOK_GETALL,
  BOOK_GET,
  BOOK_ERROR,
  BOOK_GETLIST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL
} from '../actions/types';

const initialState = {
  loading: true,
  books: [],
  selectedBook: {},
  error: {}
};

export default function book(state = initialState, action) {
  const { type, payload } = action;
  console.log('state.books =>', state.books)
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
    case BOOK_UPDATE_FAIL:
    case BOOK_ERROR:
      return {
        ...state,
        error: payload,
        selectedBook: {},
        loading: false,
      };
    case BOOK_UPDATE_SUCCESS:
      return {
        ...state,
        books: state.books.data.map(item => item._id === payload ? payload : item),
        selectedBook: {},
        loading: false,
      };
    default:
      return state;
  }
}