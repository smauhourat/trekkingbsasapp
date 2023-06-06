import React from "react";
import { useSearchParams } from 'react-router-dom';

const BookingFailure = () => {

    const [searchParams] = useSearchParams();
    console.log(searchParams);
    const external_reference = searchParams.get('external_reference');

    return (
        <div>
            <section className="container">
                <h1>Anduvo todo MAL!!!!</h1>
                <h2>bookId: {external_reference}</h2>
            </section>
        </div>
    )
}

export default BookingFailure;