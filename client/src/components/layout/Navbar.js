import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <ul className="brand-logo">
        <li><img src="img/logo.svg" className="img-logo" alt="logo" /></li>
        <li>
          <h1>
            <a href="index.html">
              Trekking Buenos Aires</a>
          </h1>          
        </li>
      </ul>
      <ul>
        <li><a href="profiles.html">Calendario</a></li>
        <li><a href="register.html">La Empresa</a></li>
        <li><a href="contact.html">Contacto</a></li>
      </ul>
    </nav>    
  )
}

export default Navbar;