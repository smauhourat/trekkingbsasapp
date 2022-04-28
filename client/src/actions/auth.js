import api from '../utils/api';
import { setAlert } from './alert';
import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, CLEAR_USERS } from './types';

// Load User
export const loadUser = () => async (dispatch) => {
    try {
      const res = await api.get('/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: AUTH_ERROR,
        payload: err.message
      });
    }
  };

export const login = (email, password) => async dispatch => {

    const body = JSON.stringify({ email, password });

    try {
        const res = await api.post('/auth', body);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }

};

// Logout
export const logout = () => async (dispatch) => {
  dispatch({type: LOGOUT});
  dispatch({type: CLEAR_USERS});
}
