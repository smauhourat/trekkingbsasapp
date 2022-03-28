import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import './App.css';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Fragment>
        <Route exact path="/" element={<Landing/>} />
          {/* <section className="container"> */}
            <Route exact path="/login" element={<Login />} />
          {/* </section> */}
      </Fragment>
    </Routes>
  </Router>
);

export default App;
