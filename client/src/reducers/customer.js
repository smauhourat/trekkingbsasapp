import {
    CUSTOMER_ADD_SUCCESS,
    CUSTOMER_ADD_FAIL

} from '../actions/types';

const initialState = {
    loading: true,
    customer: {},
    error: {}
};

export default function customer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CUSTOMER_ADD_SUCCESS:
            console.log('payload:', payload)
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
        default:
            return state;
    }
}