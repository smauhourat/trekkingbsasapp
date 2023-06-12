import api from '../utils/api';
import { setAlert } from './alert';

import {
    CUSTOMER_ADD_SUCCESS,
    CUSTOMER_ADD_FAIL

} from './types';


export const addCustomer = (formData) => async (dispatch) => {
    try {
        const res = await api.post('/customers', formData);

        dispatch({
            type: CUSTOMER_ADD_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert('Registracion completa', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: CUSTOMER_ADD_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

        dispatch(setAlert('Registracion erronea, vuelva a intentarlo mas tarde', 'danger'));
        //dispatch(setAlert({ msg: err }, 'danger'));
    }
}