import api from '../utils/api';
import { setAlert, setAlertNavigate } from './alert';
import { loadCustomer } from './auth'

import {
    CUSTOMER_UPDATE_SUCCESS,
    CUSTOMER_UPDATE_FAIL,
    CUSTOMER_ADD_FAIL 

} from './types';


export const addCustomer = (formData, navigate) => async (dispatch) => {
    try {
        const res = await api.post('/customers', formData)

        dispatch({
            type: CUSTOMER_UPDATE_SUCCESS,
            payload: {...res.data.customer, email: res.data.user.email }
        })

        dispatch(setAlert('Registracion completa', 'success'))
        navigate(`/validate-email/${res.data.user.email}`)
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: CUSTOMER_ADD_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        if (errors === undefined)
            dispatch(setAlert('Registracion erronea, vuelva a intentarlo mas tarde', 'danger'))
    }
}

export const updateCustomer = (id, formData, navigate) => async (dispatch) => {
    try {
        const res = await api.put(`/customers/${id}`, formData)

        dispatch({
            type: CUSTOMER_UPDATE_SUCCESS,
            payload: {...res.data.custom }
        })

        dispatch(loadCustomer())
        dispatch(setAlertNavigate('Datos modificados con exito', 'success', navigate, '/', 2000))

    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: CUSTOMER_UPDATE_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        if (errors === undefined)
            dispatch(setAlert('Registracion erronea, vuelva a intentarlo mas tarde', 'danger'))
    }
}