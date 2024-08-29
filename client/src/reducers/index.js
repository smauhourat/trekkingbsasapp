import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import user from './user';
import trip from './trip';
import book from './book';
import customer from './customer';

export default combineReducers({
  alert,
  auth,
  user,
  trip,
  book,
  customer,
});