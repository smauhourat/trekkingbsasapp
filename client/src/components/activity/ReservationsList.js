import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ReservationsList = ({items}) => {

    console.log('items =>', items)
    return (
        <ul>
            {items?.map((reservation) => (
                <li>
                   {reservation.code}
                </li>
            ))}
        </ul>
    )
}

export default ReservationsList