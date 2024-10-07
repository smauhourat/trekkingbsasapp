import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getTrips } from '../../actions/trip'
import TripsListContent from './TripsListContent'
import Spinner from '../layout/Spinner'
import { formatDateISOFromDate } from '../../utils/dateHelper'
import environment from '../../utils/environment'

const TripsList = ({ getTrips, trip: { trips, loading } }) => {
  const [currentPage, setCurrentPage] = useState()
  const [showActive, setShowActive] = useState(false)
  const [sort, setSort] = useState('date')
  const [order, setOrder] = useState(-1)
  const [search, setSearch] = useState('')

  const RECORDS_PER_PAGE = environment.recordsPerPage

  useEffect(() => {
    getTrips(`&limit=${RECORDS_PER_PAGE}&page=1&sort=${sort}&order=${order}`)
    setCurrentPage(1)
  }, [sort, order, getTrips])

  const goToNextPage = () => {
    if (((currentPage - 1) * trips?.metadata.limit) + trips?.metadata.count < trips?.metadata.total) {
      setCurrentPage(currentPage + 1)
      getTrips(`&limit=${RECORDS_PER_PAGE}&page=${currentPage + 1}&sort=${sort}&order=${order}`)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      getTrips(`&limit=${RECORDS_PER_PAGE}&page=${currentPage - 1}&sort=${sort}&order=${order}`)
    }
  }

  const handleOnChangeActive = (e) => {
    setShowActive(!showActive)
    if (!showActive) {
      const currentDate = formatDateISOFromDate(new Date())
      getTrips(`&limit=${RECORDS_PER_PAGE}&page=${currentPage}&sort=${sort}&order=${order}&df=${currentDate}`)
    } else {
      getTrips(`&limit=${RECORDS_PER_PAGE}&page=${currentPage}&sort=${sort}&order=${order}`)
    }
  }

  const handleOnChangeOrder = (e) => {
    setSort(e)
    setOrder(order === 1 ? -1 : 1)
    const currentDate = showActive ? formatDateISOFromDate(new Date()) : ''
    getTrips(`&limit=${RECORDS_PER_PAGE}&page=${currentPage}&sort=${sort}&order=${order}&df=${currentDate}`)
  }

  const sortOrderIcon = (e) => {
    const classIcon = order === 1 ? 'fas fa-arrow-down' : 'fas fa-arrow-up'
    return e === sort ? <i className={classIcon} /> : ''
  }

  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleOnClickSearch = (e) => {
    getTrips(`&q=${search}&limit=${RECORDS_PER_PAGE}&page=1&sort=${sort}&order=${order}`)
  }

  const handleOnKeyDownSearch = (e) => {
    if (e.key === 'Enter') {
      getTrips(`&q=${search}&limit=${RECORDS_PER_PAGE}&page=1&sort=${sort}&order=${order}`)
    }
  }

  return (
    <>
      <div>
        <h2 className='my-2'>Eventos</h2>
        <div className='search-panelXX'>
          <input type='checkbox' id='showActive' onChange={handleOnChangeActive} /><label htmlFor='showActive' alt='asda asdads'> Mostrar solo activos</label>{showActive}
          <input type='text' className='input-text' value={search} onChange={handleOnChangeSearch} onKeyDown={handleOnKeyDownSearch} /><button className='btn btn-primary btn-link' onClick={handleOnClickSearch}><i className='fas fa-search' title='Buscar' /></button>
        </div>
        <div className='scroll-x'>
          <table className='table'>
            <thead>
              <tr>
                <th width='20%'><div className='link' onClick={() => handleOnChangeOrder('date')}>Fecha {sortOrderIcon('date')}</div></th>
                <th width='35%'><div className='link' onClick={() => handleOnChangeOrder('title')}>Titulo {sortOrderIcon('title')}</div></th>
                <th width='5%'><div className='link' onClick={() => handleOnChangeOrder('quota')}>Cupo {sortOrderIcon('quota')}</div></th>
                <th width='5%' className='no-wrap'><div className='link' onClick={() => handleOnChangeOrder('reservations')}>Reservas  {sortOrderIcon('reservations')}</div></th>
                <th width='5%'>Publicado</th>
                <th width='30%'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (<tr><td colSpan='6'><Spinner /></td></tr>) : (<TripsListContent />)}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan='6'>
                  <button
                    onClick={() => goToPrevPage()}
                    className='btn btn-primary btn-small'
                    title='Anterior'
                  >
                    <li className='fas fa-angle-left' />
                  </button>

                  <button
                    onClick={() => goToNextPage()}
                    className='btn btn-primary btn-small'
                    title='Siguiente'
                  >
                    <li className='fas fa-angle-right' />
                  </button>
                  <div className='tiny inline'>
                    Página {trips?.metadata?.page} de {Math.ceil(trips?.metadata?.total / trips?.metadata?.limit)} - total de registros: {trips?.metadata?.total}
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  )
}

TripsList.propTypes = {
  getTrips: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  trip: state.trip
})

export default connect(mapStateToProps, { getTrips })(TripsList)
