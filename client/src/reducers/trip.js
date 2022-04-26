import {
    CLEAR_TRIPS,
    GET_TRIPS,
    DELETETRIP_SUCCESS,
    DELETETRIP_FAIL
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
                trips: []
            };
        case DELETETRIP_SUCCESS:
            return {
                ...state,
                trips: state.trips.filter((trip) => trip._id !== payload),
                loading: false
            };           
        case DELETETRIP_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            };              
        default:
            return state;            
    }
  }