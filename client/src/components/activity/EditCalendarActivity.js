import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAlert, setAlertNavigate } from '../../actions/alert'
import Calendar from 'react-calendar'
import { useQuery, useQueryClient } from '@tanstack/react-query'    
import 'react-calendar/dist/Calendar.css';
import Spinner from '../layout/Spinner';
import { getActivity } from '../../http/activity'

const EditCalendarActivity = ({
    setAlert,
    setAlertNavigate
}) => {

    const navigate = useNavigate()
    const goBack = () => navigate(-1);
    const id = useParams().id

    const [value, onChangeDate] = useState(new Date());

    const actiopType = null
    const onChangeAction  = () => {
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        // if (validateForm()) {
        //     addTrip(formData, navigate)
        // }
    }

    const { data, refetch, isPending, isError } = useQuery({
        queryKey: ['activity'],
        queryFn: () => getActivity(id),
    });    

    const handleOnClickDay = (value) => {
        console.log(value.toISOString().substring(0, 10))
        //refetch()
        console.log('data =>', data.calendar)
    }

    const onChange = (e) => {
        const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        //setFormData({ ...formData, [e.target.name]: newValue })
    }


    return (
        <section className='container'>
            <h1 className='large text-primary'>Calendario</h1>
            <div className="two-columns-grid">
                <div className="column-1">
                    {isPending && (
                        <Spinner />
                    )}
                    {!isPending && (
                        <Calendar 
                            onClickDay={(value, e) => handleOnClickDay(value)} 
                            onChange={onChangeDate} 
                            value={value} 
                            tileDisabled={({ date }) => date.getDate() === 0} 
                            />
                            //tileDisabled={({ date }) => (data.calendar.find(e => e.date.getTime() === date.getTime()) === undefined)}
                    )}
                </div>
                <div className="column-2">
                    {/* <strong> {value.toISOString().substring(0,10)}</strong> */}
                    <h2><strong>Administrar agenda</strong></h2>
                    <hr></hr>
                    <form
                        className='form'
                        onSubmit={e => onSubmit(e)}
                    >
                        <div className='form-group'>
                            <label>Fecha Desde</label>
                            <input
                                type='date'
                                placeholder='Fecha Desde'
                                name='dateFrom'
                                
                                onChange={onChange}
                                required
                            />
                        </div>                            
                        <div className='form-group'>
                            <label>Fecha Hasta</label>
                            <input
                                type='date'
                                placeholder='Fecha Hasta'
                                name='dateTo'
                                className='form'
                                onChange={onChange}
                                required
                                />
                        </div>
                        <div className='form-group'>
                            <label>Acción</label>
                            <select name='action' value={actiopType} onChange={onChangeAction}>
                                <option value=''>Indique una acción</option>
                                <option value='Trekking'>Habilitar</option>
                                <option value='Caminatas'>Deshabilitar</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <input type='submit' className='btn btn-success' value='Aplicar' />
                        </div>
                    </form>
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

EditCalendarActivity.propTypes = {
    setAlert: PropTypes.func.isRequired,
    setAlertNavigate: PropTypes.func.isRequired
}

export default connect(null, { setAlert, setAlertNavigate })(EditCalendarActivity)

