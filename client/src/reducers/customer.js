import {
    CUSTOMER_ADD_SUCCESS,
    CUSTOMER_ADD_FAIL,
    CUSTOMER_UPDATE_SUCCESS,
    CUSTOMER_UPDATE_FAIL

} from '../actions/types';

const initialState = {
    loading: false,
    customer: {},
    error: {}
};

export default function customer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CUSTOMER_ADD_SUCCESS:
            // console.log('payload:', payload)
            return {
                ...state,
                customer: payload,
                loading: false
            };
        case CUSTOMER_ADD_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CUSTOMER_UPDATE_SUCCESS:
            return {
                ...state,
                customer: payload,
                loading: false
            }
        case CUSTOMER_UPDATE_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}