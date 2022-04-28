import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

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
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <div className="logo-big"></div>
          <h1 className="x-large">Bienvenidos a Trekking Buenos Aires</h1>
          <p className="lead">
            Somos un grupo de amigos, y amigos de amigos, sin intenciones de lucro que hacemos caminos de trekking, los inventamos y los conquistamos!!!!
          </p>
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
          Buscar
        </button>

            </div>          
          </div>
          <div>
            <a href="#">Trekking</a> | <a href="#">Caminatas</a> | <a href="#">Kayaks</a> | <a href="#">Mountain Bike</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
