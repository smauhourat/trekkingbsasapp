import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCustomer } from '../../http/customer'
import Spinner from '../layout/Spinner';

const CustomerView = () => {

    const navigate = useNavigate()
    const goBack = () => navigate(-1);

    const customerId = useParams().id;

    const { data, isPending, isError } = useQuery({
        queryKey: ['customer', { id: customerId }],
        queryFn: () => getCustomer(customerId)
    });    


    return (
        <section className='container'>
            <h1 className='large text-primary'>Cliente</h1>
            {isPending && <Spinner />}
            {!isPending && data && (
                <div className='form bg-white p-1 my-1'>
                    <div className='form-group label-medium'>
                        <strong>Nombre: </strong>{data?.first_name}
                    </div>
                    <div className='form-group'>
                        <div className='form-group label-medium'>
                            <strong>Apellido: </strong>{data?.last_name}
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='form-group label-medium'>
                            <strong>Email: </strong>{data.user.email}
                        </div>
                    </div>

                    <div className='form-group'>
                        <div className='form-group label-medium'>
                            <strong>DNI: </strong>{data?.dni}
                        </div>
                    </div>                    
                    <div className='form-group'>
                        <div className='form-group label-medium'>
                            <strong>Telefono: </strong>{data?.phone}
                        </div>
                    </div>                    
                    <div className='form-group'>
                        <div className='form-group label-medium'>
                            <strong>Apto Medico Anual: </strong>{data?.medical_status}
                        </div>
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