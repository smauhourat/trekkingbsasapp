import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <ul className="brand-logo">
        <li>
          {/* <img src="./img/logo.jpg" className="img-logo" alt="logo" /> */}
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
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>    
  )
}

export default Navbar;