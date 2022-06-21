import React from 'react'

const Calendar = () => {
  return (
    <section class="container">
        <h1 class="large text-primary">Calendario</h1>
        <div class="nav-months">
            <ul>
                <li><a class="disabled"> enero </a></li>
                <li><a class="disabled"> febrero </a></li>
                <li><a class="disabled"> marzo </a></li>
                <li><a class="disabled"> abril </a></li>
                <li><a class="disabled"> mayo </a></li>
                <li><a class="active"> junio </a></li>
                <li><a> julio </a></li>
                <li><a> agosto </a></li>
                <li><a> septiembre </a></li>
                <li><a> octubre </a></li>
                <li><a> noviembre </a></li>
                <li><a> diciembre </a></li>
            </ul>
        </div>
        <div class="my-1">&nbsp;</div>
        <h1 class="lead">Actividades</h1>
    </section>
  )
}

export default Calendar;
