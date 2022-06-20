import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Trips from './components/trips/Trips';
import AddUser from './components/user/AddUser';
import AddTrip from './components/trips/AddTrip';
import EditTrip from './components/trips/EditTrip';
//import TripForm from './components/trips/TripForm';
import AddImages from './components/trips/AddImages';
import TripDetails from './components/trips/TripDetails';
import PrivateRoute from './components/routing/PrivateRoute';
import ContactForm from './components/contact/ContactForm';
import Company from './components/static/Company';
import { LOGOUT } from './actions/types';

import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);  
  return (  
  <Provider store={store}>
    <Router>
      <Navbar />
      <Alert />
      <Routes>
        <Fragment>
          <Route exact path="/" element={<Landing/>} />
            <Route exact path="/login" element={<Login />} />
            <Route path="dashboard" element={<PrivateRoute component={Dashboard} />}/>
            <Route path="add-user" element={<PrivateRoute component={AddUser} />} />
            <Route path="add-trip" element={<PrivateRoute component={AddTrip} />} />
            <Route path="edit-trip/:id" element={<PrivateRoute component={EditTrip} />} />
            <Route path="add-images/:id" element={<PrivateRoute component={AddImages} />} />
            <Route path="trips" element={<Trips />} />
            <Route path="trip-details/:id" element={<TripDetails/>} />
            <Route path="contact" element={<ContactForm />} />
            <Route path="company" element={<Company />} />
        </Fragment>
      </Routes>
    </Router>
  </Provider>
  );
};

export default App;
