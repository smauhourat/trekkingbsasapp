import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAlert, setAlertNavigate } from '../../actions/alert'
import Calendar from 'react-calendar'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getActivityReservations } from '../../http/activity'
import ReservationsList from './ReservationsList'
import 'react-calendar/dist/Calendar.css';
import Spinner from '../layout/Spinner';

const ReservationsActivity = ({
    setAlert,
    setAlertNavigate
}) => {

    const navigate = useNavigate()
    const goBack = () => navigate(-1);

    const id = useParams().id

    const [value, onChange] = useState(new Date());

    const { data, refetch, isPending, isError } = useQuery({
        queryKey: ['reservations', value],
        queryFn: () => getActivityReservations(id, value.toISOString().substring(0, 10)),
    });

    const handleOnClickDay = (value) => {
        console.log(value.toISOString().substring(0, 10))
        refetch()
    }

    return (
        <section className='container'>
            <h1 className='large text-primary'>Reservas</h1>
            <div class="two-columns-grid">
                <div class="column-1">
                    <Calendar onClickDay={(value, e) => handleOnClickDay(value)} onChange={onChange} value={value} />
                </div>
                <div class="column-2">
                    <strong> {value.toISOString().substring(0, 10)}</strong>
                    <hr></hr>
                    {isPending && (
                        <Spinner />
                    )}
                    {!isPending && (
                        <ReservationsList items={data.data} />
                    )}
                </div>
            </div>
            <div className='text-center m-3'>
                <Link onClick={(e) => goBack()} className='btn btn-primary'>
                    <i className='text-primary' /> Volver
                </Link>                           
            </div>
        </section>
    )
}

ReservationsActivity.propTypes = {
    setAlert: PropTypes.func.isRequired,
    setAlertNavigate: PropTypes.func.isRequired
}

export default connect(null, { setAlert, setAlertNavigate })(ReservationsActivity)

