import React, { Fragment, useEffect } from 'react'
// import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Menubar from './components/layout/Menubar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordConfirm from './components/auth/ForgotPasswordConfirm';
import ResetPassword from './components/auth/ResetPassword';
import ResetPasswordConfirm from './components/auth/ResetPasswordConfirm';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import DashRouter from './components/dashboard/DashRouter';
import DashboardCustomer from './components/customer/DashboardCustomer';
import Trips from './components/trips/Trips';
import AddUser from './components/user/AddUser';
import AddTrip from './components/trips/AddTrip';
import EditTrip from './components/trips/EditTrip';
import AddImages from './components/trips/AddImages';
import TripDetails from './components/trips/TripDetails';
import PrivateRoutes from './components/routing/PrivateRoutes';
import PrivateRoutesAdmin from './components/routing/PrivateRoutesAdmin';
import MaintenanceRoute from './components/routing/MaintenanceRoute';
import ContactForm from './components/contact/ContactForm';
import Company from './components/static/Company';
import Test from './components/static/Test';
import Conditions from './components/static/Conditions';
import Calendar from './components/calendar/Calendar';
import { LOGOUT } from './actions/types';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from './components/Fallback';
import Maintenance from './components/Maintenance';
import BookingSuccess from './components/trips/BookingSuccess';
import BookingFailure from './components/trips/BookingFailure';
import BookDetails from './components/customer/BookDetails';
import BookList from './components/customer/BookList';
import Book from './components/customer/Book';
import CustomerRegister from './components/customer/CustomerRegister';
import Customer from './components/customer/Customer';
import CustomerValidateEmail from './components/customer/CustomerValidateEmail';
import Unauthorized from './components/auth/Unauthorized'

import './App.css'
// Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser, loadCustomer } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import RequireAuth from './components/routing/RequireAuth';

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token)
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser())
    store.dispatch(loadCustomer())
    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT })
    })
  }, [])

  const errorHandler = (error, errorInfo) => {
    console.log('Logging', error, errorInfo)
  }

  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
          <Navbar />
          <Menubar />
          <Alert />
          <Routes>
            <>
              {/* <Route exact path="/" element={<Landing />} /> */}
              <Route exact path="/" element={<MaintenanceRoute component={Landing} />} />
              <Route exact path="/maintenance" element={<Maintenance />} />
              <Route exact path="/forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password-confirm/:email" element={<ForgotPasswordConfirm />} />
              <Route path="reset-password/:id/:token" element={<ResetPassword />} />
              <Route path="reset-password-confirm" element={<ResetPasswordConfirm />} />
              <Route path="validate-email" element={<CustomerValidateEmail />} />
              <Route path="trips" element={<Trips />} />
              <Route path="trip-details/:id" element={<TripDetails />} />
              <Route path="contact" element={<MaintenanceRoute component={ContactForm} />} />
              <Route path="company" element={<MaintenanceRoute component={Company} />} />
              <Route path="test" element={<MaintenanceRoute component={Test} />} />
              <Route path="conditions" element={<MaintenanceRoute component={Conditions} />} />
              <Route path="calendar" element={<MaintenanceRoute component={Calendar} />} />
              <Route path="booking-failure/*" element={<BookingFailure />} />
              <Route path="customer-register" element={<CustomerRegister />} />
              <Route path="dashrouter" element={<DashRouter />} />
              <Route path="unauthorized" element={<Unauthorized />} />
              <Route element={<RequireAuth allowedRoles="customer" />}>
              <Route path="booking-success/:id" element={<BookingSuccess />} />
                <Route path="customer" element={<Customer />} />
                <Route path="dashboardcustomer" element={<DashboardCustomer />} />
                <Route path="book-details/:id" element={<BookDetails />} />
                <Route path="books" element={<BookList />} />
                <Route path="trip-book/:id" element={<Book />} />
              </Route>
              
              <Route element={< RequireAuth allowedRoles="admin" />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="add-trip" element={<AddTrip />} />
                <Route path="edit-trip/:id" element={<EditTrip />} />
                <Route path="add-images/:id" element={<AddImages />} />
                <Route path="add-user" element={<AddUser />} />
              </Route>
            </>
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </ErrorBoundary>
      </Router>
      {/* <Analytics beforeSend={(e) => {
        if(localStorage.getItem('va-disabled')) {
          return null
        }
        return e
      }}/> */}
    </Provider>
  )
}

export default App
