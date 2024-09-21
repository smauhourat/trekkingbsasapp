import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCustomer } from '../../http/customer'
import Spinner from '../layout/Spinner';

const CustomerView = () => {

    const navigate = useNavigate()
    const goBack = () => navigate(-1);

    const customerId = useParams().id;
    console.log('customerId => ', customerId)

    // const { data, isPending, isError, error } = useQuery({
    //     queryKey: ['customer', { customerId: customerId }],
    //     queryFn: ({ signal }) => getCustomer({ signal, customerId }),
    //     enabled: customerId !== undefined
    // });

    const { data, isPending, isError } = useQuery({
        queryKey: ['customer', { id: customerId }],
        queryFn: () => getCustomer(customerId)
    });    


    return (
        <section className='container'>
            <h1>Customer View</h1>
            {isPending && <Spinner />}
            {!isPending && (
                <div className='form bg-white p-1 my-1'>
                    <div className='form-group'>
                        <label>
                            <strong>Nombre: </strong>{data?.first_name}
                        </label>
                    </div>
                    <div className='form-group'>
                        <label>
                            <strong>Apellido: </strong>{data?.last_name}
                        </label>
                    </div>
                    <div className='form-group'>
                        <label>
                            <strong>DNI: </strong>{data?.dni}
                        </label>
                    </div>                    
                    <div className='form-group'>
                        <label>
                            <strong>Telefono: </strong>{data?.phone}
                        </label>
                    </div>                    
                </div>
            )}
            <div className='text-center m-3'>
                <Link onClick={(e) => goBack()} className='btn btn-primary'>
                    <i className='text-primary' /> Volver
                </Link>
            </div>

        </section>
    )
}

export default CustomerView