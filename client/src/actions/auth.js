import api from '../utils/api';
import axios from 'axios';
import { setAlert } from './alert';
import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR } from './types';

// Load User
export const loadUser = () => async (dispatch) => {
    try {
      const res = await api.get('/auth');
    //   const res = {data: {
    //     "_id": "6232730959e03889cf734c63",
    //     "name": "Santiago Mauhourat",
    //     "email": "santiagomauhourat@hotmail.com",
    //     "date": "2022-03-16T23:30:17.395Z",
    //     "__v": 0
    // }};
  
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