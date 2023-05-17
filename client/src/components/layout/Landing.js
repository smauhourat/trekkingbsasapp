import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Landing = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const onChange = e =>
    setSearch(e.target.value);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/trips/?q=${search}`)
    }
  }

  return (
    <>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <div className="logo-big"></div>
            <h1 className="x-large">Bienvenidos a Trekking Buenos Aires</h1>
            <h1 className="large">Cruzando los límites</h1>
            <p className="lead">
              Somos un grupo de amigos, y amigos de amigos haciendo trekking.
            </p>
            <div className="buttons">
              <button
                onClick={() => navigate(`/trips/?q=${search}`)}
                className="btn btn-primary"
              >
                Proximas Salidas
              </button>
            </div>
            <div class="search"></div>
            {/*
            <div className="search">
              <input
                type="text"
                className="textinput"
                placeholder="Que actividad estas buscando realizar?"
                name="search"
                value={search}
                onChange={e => onChange(e)}
                onKeyDown={handleKeyDown}
              />
              <div className="buttons">
                <button
                  onClick={() => navigate(`/trips/?q=${search}`)}
                  className="btn btn-primary"
                >
                  Proximas Salidas
                </button>
              </div>
            </div>
            */}
            <div>
              <Link to={`/trips/?q=${search}&category=Trekking`} className="link">
                Trekking
              </Link>
              |
              <Link to={`/trips/?q=${search}&category=Caminatas`} className="link">
                Caminatas
              </Link>
              |
              <Link to={`/trips/?q=${search}&category=Kayaks`} className="link">
                Kayaks
              </Link>
              |
              <Link to={`/trips/?q=${search}&category=Mountain Bike`} className="link">
                Mountain Bike
              </Link>
            </div>
            <div className="my-1 bg-dark">
              <Link to={`/conditions`} className="text-link">Condiciones del Grupo</Link>
            </div>
          </div>
        </div>
      </section>
      <footer id="footer" className="bg-dark">
        <p>Desarrollado por <a href="http://adhentux.com" target="_blank" rel="noreferrer">Adhentux</a></p>
      </footer>
    </>
  )
}

export default Landing
