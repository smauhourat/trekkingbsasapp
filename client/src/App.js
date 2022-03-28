import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import './App.css';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Fragment>
        {/* <Navbar /> */}
        <Route exact path="/" element={<Landing/>} />
      </Fragment>
    </Routes>
  </Router>
);

export default App;
