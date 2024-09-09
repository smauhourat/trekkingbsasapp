import api from '../utils/api';
import { setAlert } from './alert';

import {
    CUSTOMER_ADD_SUCCESS,
    CUSTOMER_ADD_FAIL

} from './types';


export const addCustomer = (formData, navigate) => async (dispatch) => {
    try {
        console.log(formData)
        
        const res = await api.post('/customers', formData);

        dispatch({
            type: CUSTOMER_ADD_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert('Registracion completa', 'success'));
        navigate(`/validate-email`);
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: CUSTOMER_ADD_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        if (errors === undefined)
            dispatch(setAlert('Registracion erronea, vuelva a intentarlo mas tarde', 'danger'));
    }
}