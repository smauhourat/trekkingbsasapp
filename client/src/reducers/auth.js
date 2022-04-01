import {
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../actions/types';

export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
        case LOGIN_SUCCESS:
                localStorage.setItem('token', payload.token)
            return {
                ...state, 
                ...payload,
                isAuthenticated: true,
                loading: false
            }
    }
}
