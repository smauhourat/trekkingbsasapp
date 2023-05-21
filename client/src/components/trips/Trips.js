import React, { Fragment, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TripItem from './TripItem';
import { getTrips } from '../../actions/trip';
import Spinner from '../layout/Spinner';

const Trips = ({ getTrips, trip: { trips, loading }, monthSearch }) => {

  function getQueryGral(arg) {
    const todayDate = new Date().toISOString().slice(0, 10);
    const query = `${arg}&df=${todayDate}`;
    const params = new URLSearchParams(query);
    return params !== undefined || params !== null ? params : '';
  }

  function getQueryCalendar() {
    const currentYear = (new Date()).getFullYear();
    const currentMonth = (new Date()).getMonth() + 1;
    const selectedMonth = monthSearch !== undefined ? monthSearch : currentMonth;

    const lastDay = (new Date(currentYear, selectedMonth, 0)).getDate();

    const ret = 'df=' + currentYear + '-' + selectedMonth + '-01&dt=' + currentYear + '-' + selectedMonth + '-' + lastDay;
    return ret;
  }

  const isCalendar = useLocation().pathname.includes('calendar');
  const search = useLocation().search;

  const query = (isCalendar ? getQueryCalendar() : getQueryGral(search)) + "&published=1";

  useEffect(() => {
    getTrips(query);
  }, [query, getTrips, monthSearch])

  return (
    <section className={isCalendar ? "container-bottom" : "container"}>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {!isCalendar ? (
            <>
              <h1 className="large text-primary">Eventos</h1>
            </>
          ) : (
            <>
              <div className="my">&nbsp;</div>
              <h1 className="title-search-result">Actividades</h1>
            </>
          )}
          <div className="profiles">
            {trips?.data?.length > 0 ? (
              trips.data.map((trip) => (
                <TripItem key={trip._id} trip={trip} />
              ))
            ) : (
              <h4>No se encontraron Eventos...</h4>
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
