import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Navbar />
      <Alert />
      <Routes>
        <Fragment>
          <Route exact path="/" element={<Landing/>} />
            {/* <section className="container"> */}
            
              <Route exact path="/login" element={<Login />} />
            {/* </section> */}
        </Fragment>
      </Routes>
    </Router>
  </Provider>
);

export default App;
