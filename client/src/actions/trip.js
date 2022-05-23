import api from '../utils/api';
import { setAlert } from './alert';

import { 
  CLEAR_TRIPS,
  GET_TRIPS,
  TRIPS_ERROR,
  DELETETRIP_SUCCESS,
  DELETETRIP_FAIL,
  ADDTRIP_SUCCESS,
  ADDTRIP_FAIL,
  UPDATETRIP_SUCCESS,
  UPDATETRIP_FAIL,
  CLEAR_TRIP,
  GET_TRIP,
  TRIP_ERROR,
  ADDIMAGE_SUCCESS,
  ADDIMAGE_FAIL,
  DELETEIMAGE_SUCCESS,
  DELETEIMAGE_FAIL
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

export const clearTrip = () => async (dispatch) => {
  dispatch({ type: CLEAR_TRIP });
}

// Add trip
export const addTrip = ( formData, navigate ) => async (dispatch) => {
  try {
      const res = await api.post('/trips', formData);
  
      dispatch({
        type: ADDTRIP_SUCCESS,
        payload: res.data
      });
  
      dispatch(setAlert('Evento agregado', 'success'));
  
      navigate('/dashboard');
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        if (Array.isArray(errors)) {
          errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
      } else {
        dispatch(setAlert(err.msg, 'danger'))
      }
  
      dispatch({
        type: ADDTRIP_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }    
};

// Add trip
export const updateTrip = ( id, formData, navigate ) => async (dispatch) => {
  try {
      const res = await api.put(`/trips/${id}`, formData);
  
      dispatch({
        type: UPDATETRIP_SUCCESS,
        payload: res.data
      });
  
      dispatch(setAlert('Evento Modificado', 'success'));
  
      navigate('/dashboard');
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        if (Array.isArray(errors)) {
          errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
      } else {
        dispatch(setAlert(err.msg, 'danger'))
      }
  
      dispatch({
        type: UPDATETRIP_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }    
};


// Delete trip
export const deleteTrip = (id) => async (dispatch) => {
  try {
    await api.delete(`/trips/${id}`);
    
    dispatch({
      type: DELETETRIP_SUCCESS,
      payload: id
    });

    dispatch(setAlert('Evento eliminado', 'success'));
  } catch (err) {
    dispatch({
      type: DELETETRIP_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getTrip = (id) => async (dispatch) => {
  dispatch({ type: CLEAR_TRIP });
  try {
    const res = await api.get(`/trips/${id}`);

    dispatch({
        type: GET_TRIP,
        payload: res.data
      });
  }catch (err) {
    dispatch({
        type: TRIP_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
  }
}

// Add image
export const addImage = (id, image) => async (dispatch) => {
  try {
    const res = await api.post(`/trips/${id}/images`, image);

    dispatch({
      type: ADDIMAGE_SUCCESS,
      payload: res.data.images[0]
    });

    dispatch(setAlert('Imagen agregada', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ADDIMAGE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }    
}

// Delete image
export const deleteImage = (id, idImage) => async (dispatch) => {
  try {
    await api.delete(`/trips/${id}/images/${idImage}`);

    dispatch({
      type: DELETEIMAGE_SUCCESS,
      payload: idImage
    });

    dispatch(setAlert('Imagen eliminada', 'success'));
  } catch (err) {
    dispatch(setAlert(err, 'error'));
    dispatch({
      type: DELETEIMAGE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//export const addImage = ()