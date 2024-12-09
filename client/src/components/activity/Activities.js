import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getActivities } from '../../http/activity'

const Activities = () => {
    const queryClient = useQueryClient()

    const { data, isPending, isError } = useQuery({
        queryKey: ['activities', {}],
        queryFn: () => getActivities()
    });

    return (
        <>
            <h1 className='large text-primary'>Actividades</h1>
            {isPending && <Spinner />}
            {!isPending && (
                <div className='trips'>
                    {data?.map((activity) => (
                        <>
                            
                            <div key={activity._id} className='trip-grid bg-white'>
                                <div className='trip-top crop'>
                                    <span className='sticker'>
                                        Todos los dias
                                    </span>
                                    <img
                                        className='round-img-slow'
                                        src={activity.images[0]?.url}
                                        alt=''
                                    />
                                </div>
                                <div className='trip-desc'>
                                    <h2>{activity.title}</h2>
                                    <p>{activity.subtitle}</p>
                                    <p className='mt-15'>{activity.location}</p>
                                    <Link to={`/trip-details/${activity._id}/false`} state={{ data: activity }} className='btn btn-primary mt-10'>
                                        <i className='text-primary' /> Ver Detalle
                                    </Link>
                                </div>
                                <div className='trip-foot1'>
                                    {activity.category &&
                                        (<span><h3>Categoria:</h3><div>{activity.category}</div></span>)}
                                    <h3>Fecha:</h3>Todos los dias
                                </div>
                                <div className='trip-foot2'>
                                    asdasd
                                </div>
                            </div>

                        </>
                    ))}
                </div>

            )}
        </>
    )
}    

export default Activities