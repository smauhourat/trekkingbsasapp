import api from '../utils/api'
import { setAlert } from './alert'

import {
  ADDUSER_SUCCESS,
  ADDUSER_FAIL,
  DELETEUSER_SUCCESS,
  DELETEUSER_FAIL,
  CLEAR_USERS,
  GET_USERS,
  USERS_ERROR
} from './types'

export const addUser = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/users', formData)
    console.log(res)

    dispatch({
      type: ADDUSER_SUCCESS,
      payload: res.data
    })

    dispatch(setAlert('Usuario agregado', 'success'))

    navigate('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: ADDUSER_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    await api.delete(`/users/${id}`)

    dispatch({
      type: DELETEUSER_SUCCESS,
      payload: id
    })

    dispatch(setAlert('Usuario eliminado', 'success'))
  } catch (err) {
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    // }
    dispatch({
      type: DELETEUSER_FAIL,
      payload: { ...err.response.data, status: err.response.status }
      // payload: { msg: err.response.statusText, status: err.response.status }
    })
    dispatch(setAlert(err.response.data.msg, 'danger'))
  }
}

// Get all Users
export const getUsers = () => async (dispatch) => {
  dispatch({ type: CLEAR_USERS })

  try {
    const res = await api.get('/users')

    dispatch({
      type: GET_USERS,
      payload: res.data.data
    })
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}
