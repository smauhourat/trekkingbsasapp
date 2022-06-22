import React, { Fragment, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TripItem from './TripItem';
import { getTrips } from '../../actions/trip';
import Spinner from '../layout/Spinner';

const Trips = ({ getTrips, trip: { trips, loading }, monthSearch }) => {

    // const queryParam2 = new URLSearchParams(useLocation().search);
    // let query = queryParam2 !== undefined || queryParam2 !== null ? queryParam2 : '';
    
    // const isCalendar = useLocation().pathname.includes('calendar');
    // const selectedMonth = monthSearch !== undefined ? monthSearch : '07';

    // query = isCalendar ? 'df=2022-'+selectedMonth+'-01' : query;



    // let fecha = new Date('12/01/2022');
    // console.log(fecha);
    // console.log(fecha.getMonth());

    function getQueryGral(arg) {
      const params = new URLSearchParams(arg);
      return params !== undefined || params !== null ? params : '';
    }

    function getQueryCalendar() {
      const currentYear = (new Date()).getFullYear();
      const currentMonth = (new Date()).getMonth() + 1;
      const selectedMonth = monthSearch !== undefined ? monthSearch : currentMonth;

      var lastDay = (new Date(currentYear, selectedMonth, 0)).getDate();

      const ret = 'df=' + currentYear + '-' + selectedMonth + '-01&dt=' + currentYear + '-' + selectedMonth + '-' + lastDay;
      return ret;
    }

    const isCalendar = useLocation().pathname.includes('calendar');
    const search = useLocation().search;

    const query = isCalendar ? getQueryCalendar() : getQueryGral(search);

    useEffect(() => {
        getTrips(query);
    }, [getTrips, monthSearch])

    return (
        <section className="container">
      {loading ? (
        <Spinner />
      ) : (            
        <Fragment>
            {!isCalendar ? (
            <>
              <h1 className="large text-primary">Eventos</h1>
              <p className="lead">
                <i className="fa-solid fa-arrow-down-wide-short"></i> Resultado de la busqueda...
              </p>
            </>
            ) : (
              <>
                <div className="my-1">&nbsp;</div>
                <h1 className="lead">Actividades</h1>
              </>
            )}
            <div className="profiles">
            {trips?.data?.length > 0 ? (
                trips.data.map((trip) => (
                <TripItem key={trip._id} trip={trip} />
                ))
            ) : (
                <h4>No se econtraron Eventos...</h4>
            )}
            </div>
        </Fragment>
      )}
        </section>
      );    
} 

Trips.propTypes = {
    getTrips: PropTypes.func.isRequired,
    trip: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state, ownProps) => ({
    trip: state.trip,
    monthSearch: ownProps.monthSearch
  });
  
  export default connect(mapStateToProps, { getTrips })(Trips);
  