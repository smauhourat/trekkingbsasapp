import React, { useState } from 'react';
import Trips from '../trips/Trips';

const Calendar = () => {

  const [selectedMonth, setSelectedMonth] = useState();

  const handleMonthClick = (e) => {
    setSelectedMonth(e);
  }

  return (
    <section className="container">
        <h1 className="large text-primary">Calendario</h1>
        <div className="nav-months">
            <ul>
                <li><a className="disabled"> enero </a></li>
                <li><a onClick={() => handleMonthClick(2)}> febrero </a></li>
                <li><a onClick={() => handleMonthClick(3)}> marzo </a></li>
                <li><a onClick={() => handleMonthClick(4)}> abril </a></li>
                <li><a onClick={() => handleMonthClick(5)}> mayo </a></li>
                <li><a className="active" onClick={() => handleMonthClick(6)}> junio </a></li>
                <li><a onClick={() => handleMonthClick(7)}> julio </a></li>
                <li><a onClick={() => handleMonthClick(8)}> agosto </a></li>
                <li><a onClick={() => handleMonthClick(9)}> septiembre </a></li>
                <li><a onClick={() => handleMonthClick(10)}> octubre </a></li>
                <li><a onClick={() => handleMonthClick(11)}> noviembre </a></li>
                <li><a onClick={() => handleMonthClick(12)}> diciembre </a></li>
            </ul>
        </div>
        {/* <div className="my-1">&nbsp;</div>
        <h1 className="lead">Actividades</h1> */}
        <Trips monthSearch={selectedMonth}/>
    </section>
  )
}

export default Calendar;
