import api from '../utils/api';
import { setAlert } from './alert';

import { 
  CLEAR_TRIPS,
  GET_TRIPS,
  TRIPS_ERROR,
  DELETETRIP_SUCCESS,
  DELETETRIP_FAIL
} from './types';

// Get trips
export const getTrips = (query) => async (dispatch) => {
    dispatch({ type: CLEAR_TRIPS });
    try {
        const res = await api.get(`/trips/?q=${query}`);

        dispatch({
            type: GET_TRIPS,
            payload: res.data
          });
    }catch (err) {
        dispatch({
            type: TRIPS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
      
    }
}

export const deleteTrip = (id) => async (dispatch) => {
  try {
    await api.delete(`/trips/${id}`);

    dispatch({
      type: DELETETRIP_SUCCESS,
      payload: id
    });

    dispatch(setAlert('Trip eliminado', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: DELETETRIP_FAIL
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


