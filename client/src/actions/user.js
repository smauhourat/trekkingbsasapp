import api from '../utils/api';
import { setAlert } from './alert';

import { ADDUSER_SUCCESS, ADDUSER_FAIL } from './types';


export const addUser = ( formData, navigate ) => async (dispatch) => {
    try {
        const res = await api.post('/users', formData);
    
        dispatch({
          type: ADDUSER_SUCCESS,
          payload: res.data
        });
    
        dispatch(setAlert('User Added', 'success'));
    
        navigate('/dashboard');
      } catch (err) {
        const errors = err.response.data.errors;
    
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
    
        dispatch({
          type: ADDUSER_FAIL,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }    
}