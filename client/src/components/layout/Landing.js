import React from 'react'

const Landing = () => {
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
            />           
            <div className="buttons">
              <a href="search-result.html" className="btn btn-primary">Buscar</a>
            </div>          
          </div>
          <div>
            <a href="">Trekking</a> | <a href="">Caminatas</a> | <a href="">Kayaks</a> | <a href="">Mountain Bike</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
