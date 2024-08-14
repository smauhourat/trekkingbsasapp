import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import user from './user'
import trip from './trip'

export default combineReducers({
  alert,
  auth,
  user,
  trip
})
