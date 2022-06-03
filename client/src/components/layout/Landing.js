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
          </div>

          {/* <div className="footer-home bg-dark">
            <footer>
              <div className="social"><a href="http://www.instagram.com/trekkingbsas"><i className="fab fa-instagram"></i></a><a href="http://www.facebook.com/trekkingbsas"><i className="fab fa-facebook-f"></i></a><a href="http://www.twitter.com/trekkingbsas"><i className="fab fa-twitter"></i></a><a href="http://www.youtube.com/trekkingbsas"><i className="fab fa-youtube"></i></a></div>
              <ul className="list-inline">
                  <li className="list-inline-item"><Link to="/">Home</Link></li>
                  <li className="list-inline-item"><a>Calendario</a></li>
                  <li className="list-inline-item"><a>La Empresa</a></li>
                  <li className="list-inline-item"><Link to="/contact">Contacto</Link></li>
              </ul>
              <p className="copyright">©TrekkingBsAs 2022 - Todos los Derechos Reservados</p>
              <p className="copyright text-dark"><strong>Desarrollado por <a href="http://www.adhentux.com" target="_blank">Adhentux</a></strong></p>
            </footer>
          </div> */}

        </div>
      </section>
      <section>
      <div className="footer-home bg-dark">
            <footer>
              <div className="social"><a href="http://www.instagram.com/trekkingbsas"><i className="fab fa-instagram"></i></a><a href="http://www.facebook.com/trekkingbsas"><i className="fab fa-facebook-f"></i></a><a href="http://www.twitter.com/trekkingbsas"><i className="fab fa-twitter"></i></a><a href="http://www.youtube.com/trekkingbsas"><i className="fab fa-youtube"></i></a></div>
              <ul className="list-inline">
                  <li className="list-inline-item"><Link to="/">Home</Link></li>
                  <li className="list-inline-item"><a>Calendario</a></li>
                  <li className="list-inline-item"><a>La Empresa</a></li>
                  <li className="list-inline-item"><Link to="/contact">Contacto</Link></li>
              </ul>
              <p className="copyright">©TrekkingBsAs 2022 - Todos los Derechos Reservados</p>
              <p className="copyright text-dark"><strong>Desarrollado por <a href="http://www.adhentux.com" target="_blank">Adhentux</a></strong></p>
            </footer>
          </div>

      </section>
    </>
  )
}

export default Landing
