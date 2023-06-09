import React, { useEffect, useState, Fragment } from 'react'
import { useSearchParams } from 'react-router-dom';

/**
 *  con el bookId, buscamos la reserva
 * 
 */

const BookingSuccess = () => {

    const [searchParams] = useSearchParams();
    console.log(searchParams);
    const bookId = searchParams.get('external_reference');

    // useEffect(() => {
    //     getBookings();
    //   }, [getBookings]);
    
    return (
        <div>
            <section className="container">
                <h1>Anduvo todo bien</h1>
                <h2>bookId: {bookId}</h2>
            </section>
        </div>
    )
}

export default BookingSuccess;