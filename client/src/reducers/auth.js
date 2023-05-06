import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGOUT,
    FORGOT_PASS_SUCCESS,
    FORGOT_PASS_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: {}
  };
  
export default function auth(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
       
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };        
        case LOGIN_SUCCESS:
            return {
                ...state, 
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case LOGIN_FAIL:
            return {
                ...state, 
                token: null,
                isAuthenticated: false,
                loading: false
            };         
        case AUTH_ERROR:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        case FORGOT_PASS_SUCCESS:
            return {
                ...state, 
                ...payload,
                loading: false
            };
        case FORGOT_PASS_FAIL:
            return {
                ...state, 
                loading: false
            };            
        default:
            return state;            
    }
}
