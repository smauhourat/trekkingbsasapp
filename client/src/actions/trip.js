import api from '../utils/api';
import { setAlert } from './alert';

import { 
  CLEAR_TRIPS,
  GET_TRIPS,
  TRIPS_ERROR
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


