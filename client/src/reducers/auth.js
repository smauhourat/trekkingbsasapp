import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGOUT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: {}
  };
  
export default function(state = initialState, action) {
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
            }
        case LOGIN_FAIL:
            return {
                ...state, 
                token: null,
                isAuthenticated: false,
                loading: false
            }           
        case AUTH_ERROR:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };             
        default:
            return state;            
    }
}
