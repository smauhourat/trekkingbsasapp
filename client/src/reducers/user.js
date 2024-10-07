import {
  CLEAR_USERS,
  GET_USERS,
  USERS_ERROR,
  ADDUSER_SUCCESS,
  DELETEUSER_SUCCESS,
  DELETEUSER_FAIL
} from '../actions/types'

const initialState = {
  loading: true,
  users: [],
  error: {}
}

export default function user (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USERS_ERROR:
      return {
        ...state,
        error: payload,
        users: null,
        loading: false
      }
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      }
    case CLEAR_USERS:
      return {
        ...state,
        users: []
      }
    case ADDUSER_SUCCESS:
      return {
        ...state,
        users: [payload, ...state.users],
        loading: false
      }
    case DELETEUSER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
        loading: false
      }
    case DELETEUSER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state
  }
}
