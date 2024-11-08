import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import metadata from '../../metadata.json'

const Landing = () => {
  const [search] = useState('')
  const navigate = useNavigate()

  return (
    <>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <div className='logo-big' />
            <h1 className='x-large'>Bienvenidos a Trekking Buenos Aires</h1>
            <h1 className='large'>Cruzando los límites</h1>
            <p className='lead'>
              Somos un grupo de viajeros y caminantes apasionados por descubrir lugares nuevos y explorarlos.
            </p>
            <div className='buttons'>
              <button
                onClick={() => navigate(`/trips/?q=${search}`)}
                className='btn btn-primary'
              >
                Proximas Salidas
              </button>
            </div>
            <div className='search' />
            {/* <div>
              <Link to={`/trips/?q=${search}&category=Trekking`} className='link'>
                Trekking
              </Link>
              |
              <Link to={`/trips/?q=${search}&category=Caminatas`} className='link'>
                Caminatas
              </Link>
              |
              <Link to={`/trips/?q=${search}&category=Kayaks`} className='link'>
                Kayaks
              </Link>
              |
              <Link to={`/trips/?q=${search}&category=Mountain Bike`} className='link'>
                Mountain Bike
              </Link>
            </div> */}
            {/* <div className='my-1 bg-dark'>
              <Link to='/conditions' className='text-link'>Condiciones del Grupo</Link>
            </div> */}
          </div>
        </div>
      </section>
      <footer id='footer' className='bg-dark'>
        <div>
          <p>Desarrollado por <a href='http://adhentux.com' target='_blank' rel='noreferrer'>Adhentux</a></p>
          <p>{`v${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision} ${metadata.buildTag}`}</p>
        </div>
      </footer>
    </>
  )
}

export default Landing
