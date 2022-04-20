import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGOUT,
    ADDUSER_SUCCESS,
    DELETEUSER_SUCCESS
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    users: [],
  };
  
export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
        case ADDUSER_SUCCESS:
            return {
                ...state,
                users: [payload, ...state.users],
                loading: false
            };
        case DELETEUSER_SUCCESS:
            return {
                ...state,
                users: state.users.filter((user) => user._id !== payload),
                loading: false
            };        
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
