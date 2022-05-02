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
  ADDIMAGE_SUCCESS,
  ADDIMAGE_FAIL
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

// Add trip
export const addTrip = ( formData, navigate ) => async (dispatch) => {
  try {
      const res = await api.post('/trips', formData);
  
      dispatch({
        type: ADDTRIP_SUCCESS,
        payload: res.data
      });
  
      dispatch(setAlert('Trip agregado', 'success'));
  
      navigate('/dashboard');
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: ADDTRIP_FAIL,
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

    dispatch(setAlert('Trip eliminado', 'success'));
  } catch (err) {
    dispatch({
      type: DELETETRIP_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add image
// export const addImage = (id, image) => async (dispatch) => {
//   try {
//     const res = await api.post(`/trips/${id}/images`, image);

//     dispatch({
//       type: ADDIMAGE_SUCCESS,
//       payload: res.data
//     });

//     dispatch(setAlert('Imagen agregada', 'success'));

//     navigate('/dashboard');
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//     }

//     dispatch({
//       type: ADDIMAGE_FAIL,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }    
// }


//export const addImage = ()