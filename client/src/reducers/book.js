import {
  BOOK_CLEAR,
  BOOK_GETALL,
  BOOK_GET
} from '../actions/types';

const initialState = {
  loading: true,
  bookings: [],
  selectedBook: {},
  error: {}
};

export default function book(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BOOK_GETALL:
      return {
          ...state,
          bokkings: payload,
          loading: false
      };
    case BOOK_CLEAR:
      return {
          ...state,
          bokkings: [],
          loading: true,
      };
    case BOOK_GET:
      return {
          ...state,
          selectedBook: payload,
          loading: false
      };      
      default:
        return state;  
    }
}