import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const CustomerView = () => {

    const navigate = useNavigate()
    const goBack = () => navigate(-1);

    return (
        <section className='container'>
            <h1>Customer View</h1>
            <div className='text-center m-3'>
                <Link onClick={(e) => goBack()} className='btn btn-primary'>
                    <i className='text-primary' /> Volver
                </Link>
            </div>

        </section>
    )
}

export default CustomerView