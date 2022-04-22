import {
    CLEAR_TRIPS,
    GET_TRIPS
} from '../actions/types';

const initialState = {
    loading: true,
    trips: [],
    error: {}
  };

export default function(state = initialState, action) {
    const { type, payload } = action;   

    switch (type) {
        case GET_TRIPS:
            return {
                ...state,
                trips: payload,
                loading: false
            }
        case CLEAR_TRIPS:
            return {
                ...state,
                users: []
            };
        default:
            return state;            
    }
  }