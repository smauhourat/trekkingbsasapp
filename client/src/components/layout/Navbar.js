import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const loginLink = (
    <li><Link to="/login">Login</Link></li>
  );

  const logoutLink = (
    <li>
      <a onClick={logout} href="#!">
        <i className="fas fa-sign-out-alt" />{' '}
        <span className="hide-sm">Logout</span>
      </a>
    </li>  
  );

  return (
    <nav className="navbar bg-dark">
      <ul className="brand-logo">
        <li>
          <div className="img-logo"></div>
        </li>
        <li>
          <h1>
            <Link to="/">
              Trekking Buenos Aires
            </Link>
          </h1>          
        </li>
      </ul>
      <ul>
        <li><Link to="profiles.html">Calendario</Link></li>
        <li><Link to="register.html">La Empresa</Link></li>
        <li><Link to="contact.html">Contacto</Link></li>
        {isAuthenticated ? logoutLink : loginLink}
      </ul>
    </nav>    
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);