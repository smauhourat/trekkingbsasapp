import React, { useState, useEffect } from 'react';
import Trips from '../trips/Trips';

const Calendar = () => {

  const [selectedMonth, setSelectedMonth] = useState();

  const handleMonthClick = (e) => {
    setSelectedMonth(e);
  }

  useEffect(() => {
    if (selectedMonth===undefined) {
      setSelectedMonth((new Date()).getMonth() + 1);
    }
}, [selectedMonth])

  return (
    <section className="container">
        <h1 className="large text-primary">Calendario</h1>
        <div className="nav-months">
            <ul>
                <li><a className="disabled"> enero </a></li>
                <li><a className={selectedMonth==2  ? 'active':''} onClick={() => handleMonthClick(2)}> febrero </a></li>
                <li><a className={selectedMonth==3  ? 'active':''} onClick={() => handleMonthClick(3)}> marzo </a></li>
                <li><a className={selectedMonth==4  ? 'active':''} onClick={() => handleMonthClick(4)}> abril </a></li>
                <li><a className={selectedMonth==5  ? 'active':''} onClick={() => handleMonthClick(5)}> mayo </a></li>
                <li><a className={selectedMonth==6  ? 'active':''} onClick={() => handleMonthClick(6)}> junio </a></li>
                <li><a className={selectedMonth==7  ? 'active':''} onClick={() => handleMonthClick(7)}> julio </a></li>
                <li><a className={selectedMonth==8  ? 'active':''} onClick={() => handleMonthClick(8)}> agosto </a></li>
                <li><a className={selectedMonth==9  ? 'active':''} onClick={() => handleMonthClick(9)}> septiembre </a></li>
                <li><a className={selectedMonth==10 ? 'active':''} onClick={() => handleMonthClick(10)}> octubre </a></li>
                <li><a className={selectedMonth==11 ? 'active':''} onClick={() => handleMonthClick(11)}> noviembre </a></li>
                <li><a className={selectedMonth==12 ? 'active':''} onClick={() => handleMonthClick(12)}> diciembre </a></li>
            </ul>
        </div>
        {/* <div className="my-1">&nbsp;</div>
        <h1 className="lead">Actividades</h1> */}
        <Trips monthSearch={selectedMonth}/>
    </section>
  )
}

export default Calendar;
