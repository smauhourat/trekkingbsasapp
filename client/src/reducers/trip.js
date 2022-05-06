import {
    CLEAR_TRIPS,
    GET_TRIPS,
    TRIPS_ERROR,
    ADDTRIP_SUCCESS,
    DELETETRIP_SUCCESS,
    DELETETRIP_FAIL,
    GET_TRIP,
    TRIP_ERROR,
    CLEAR_TRIP,
    ADDIMAGE_SUCCESS,
    DELETEIMAGE_SUCCESS
} from '../actions/types';

const initialState = {
    loading: true,
    trips: {},
    selectedTrip: {},
    error: {}
  };

export default function(state = initialState, action) {
    const { type, payload } = action;   

    switch (type) {
        case ADDIMAGE_SUCCESS:
            let newAddStateAddImage = {...state};
            newAddStateAddImage.selectedTrip.images = [payload, ...newAddStateAddImage.selectedTrip.images];
            newAddStateAddImage.loading = false;

            return newAddStateAddImage;

        case DELETEIMAGE_SUCCESS:
            let newStateDeleteImage = {...state};
            newStateDeleteImage.selectedTrip.images = newStateDeleteImage.selectedTrip.images.filter((image) => image.public_id !== payload);
            newStateDeleteImage.loading = false;

            return newStateDeleteImage;

        case GET_TRIP:
            return {
                ...state,
                selectedTrip: payload,
                loading: false
            };

        case TRIP_ERROR:
            return {
                ...state,
                error: payload,
                selectedTrip: {},
                loading: false,
            };            

        case CLEAR_TRIP:
            return {
                ...state,
                selectedTrip: {}
            };

        case TRIPS_ERROR:
            return {
                ...state,
                error: payload,
                trips: null,
                loading: false,
            };

        case GET_TRIPS:
            return {
                ...state,
                trips: payload,
                loading: false
            };

        case CLEAR_TRIPS:
            return {
                ...state,
                trips: {}
            };

        case ADDTRIP_SUCCESS:
            let newAddState = {...state};
            newAddState.trips.metadata.total = newAddState.trips.metadata.total+1;
            newAddState.trips.data = [payload, ...newAddState.trips.data];
            newAddState.loading = false;

            return newAddState;

        case DELETETRIP_SUCCESS:
            let newState = {...state};
            newState.trips.metadata.total = newState.trips.metadata.total-1;
            newState.trips.data = newState.trips.data.filter((trip) => trip._id !== payload);
            newState.loading = false;

            return newState;

        case DELETETRIP_FAIL:
            return {
                ...state,
                error: payload,
                loading: false,
                trips: null
            };
                  
        default:
            return state;            
    }
  }