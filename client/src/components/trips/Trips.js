import React, { Fragment, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TripItem from './TripItem'
import { getTrips } from '../../actions/trip'
import Spinner from '../layout/Spinner'

const Trips = ({ getTrips, trip: { trips, loading }, monthSearch }) => {
  function getQueryGral (arg) {
    const todayDate = new Date().toISOString().slice(0, 10)
    const query = `${arg}&df=${todayDate}`
    const params = new URLSearchParams(query)
    return params !== undefined || params !== null ? params : ''
  }

  function getQueryCalendar () {
    const currentYear = (new Date()).getFullYear()
    const currentMonth = (new Date()).getMonth() + 1
    const selectedMonth = monthSearch !== undefined ? monthSearch : currentMonth

    const lastDay = (new Date(currentYear, selectedMonth, 0)).getDate()

    //const ret = 'df=' + currentYear + '-' + selectedMonth + '-01&dt=' + currentYear + '-' + selectedMonth + '-' + lastDay

    const ret = 'df=' + (selectedMonth < currentMonth ? currentYear + 1 : currentYear) + '-' + selectedMonth + '-01&dt=' + (selectedMonth < currentMonth ? currentYear + 1 : currentYear) + '-' + selectedMonth + '-' + lastDay

    console.log('currentMonth =>', currentMonth)
    console.log('query-calendar =>', ret)
    return ret
  }

  const isCalendar = useLocation().pathname.includes('calendar')
  const search = useLocation().search

  const query = (isCalendar ? getQueryCalendar() : getQueryGral(search)) + '&published=1&sort=date&order=1'

  // console.log('query', query)

  useEffect(() => {
    getTrips(query)
  }, [query, getTrips, monthSearch])

  return (
    <section className={isCalendar ? 'trips-container-bottom' : 'trips-container'}>
      {loading
        ? (
          <Spinner />
          )
        : (
          <>
            {!isCalendar
              ? (
                <>
                  <h1 className='large text-primary'>Eventos</h1>
                </>
                )
              : (
                <>
                  <div className='my'>&nbsp;</div>
                  {/* <h1 className='title-search-result'>Actividades</h1> */}
                </>
                )}

            {trips?.data?.length > 0 ? 
              (<>
                <div className='trips'>
                  {trips.data.map((trip) => (
                    <>
                      <TripItem trip={trip} />
                    </>
                  ))}
                </div>
              </>) 
              : 
              (<>
                <div className='text-center m-3'>
                  <h4>No se encontraron Eventos...</h4>
                </div>
              </>)
            }
          </>
          )}
    </section>
  )
}

Trips.propTypes = {
  getTrips: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  trip: state.trip,
  monthSearch: ownProps.monthSearch
})

export default connect(mapStateToProps, { getTrips })(Trips)
