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

    const onChange = (e) => {
        const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        //setFormData({ ...formData, [e.target.name]: newValue })
    }

    function tileDisabled({ date, view }) {
        //console.log(date.toISOString().substring(0, 10))
        //console.log(date.toISOString())
        // if (data.calendar.find(e => e.date === date.toISOString()) === undefined)
        //     return true
        //console.log('find4', data.calendar.find(e => e.date === (date.toISOString().substring(0, 10) + 'T00:00:00.000Z')) === undefined)
        return data.calendar.find(e => e.date === (date.toISOString().substring(0, 10) + 'T00:00:00.000Z')) === undefined
    }

    // const now = new Date();
    // const tomorrow = addDays(now, 1);
    // const in3Days = addDays(now, 3);
    // const in5Days = addDays(now, 5);

    //const highlightedDates = [tomorrow, in3Days, in5Days];
    const highlightedDates = [(new Date('2024-12-11'))];

    function isSameDay(a, b) {
        //return differenceInCalendarDays(a, b) === 0;
        return a === b;
    }

    function tileClassName({ date, view }) {
        if (
            view === 'month' &&
            data.calendar.find(e => e.date === (date.toISOString().substring(0, 10) + 'T00:00:00.000Z')) !== undefined
            //highlightedDates.find((dDate) => dDate === (date.toISOString().substring(0, 10) + 'T00:00:00.000Z'))
        ) {
            return 'react-calendar-highlight';
        }        
    }

    const handleOnClickDay = (value) => {
        //refetch()
        // console.log(value.getTime())
        // console.log(value.toISOString().substring(0, 10))
        // console.log(value)
        // console.log('data =>', data.calendar)
        // console.log('data[16] =>', data.calendar[16].date)
        // console.log('find', data.calendar.find(e => e._id.toString() === '6765b6cad599517370cc5600'))
        // console.log('find2', data.calendar.find(e => e.date === '2024-12-22T00:00:00.000Z'))
        // console.log('find3', data.calendar.find(e => e.date === (new Date('2026-12-22')).toISOString()))
        const date = new Date('2024-12-11')
        console.log('highlightedDate1 =>', highlightedDates[0])
        console.log('highlightedDate2 =>', highlightedDates.find((dDate) => dDate === (date.toISOString().substring(0, 10) + 'T00:00:00.000Z')))

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
                            tileClassName={tileClassName}
                            tileDisabled={tileDisabled}
                            />
                    )}
                    <div>
                        <br/>
                        {/* Referencias<br /> */}
                        <div className='p-1'>
                            <div className="react-calendar-ref-available inline mx"></div>
                            <div className="inline vertical-align">Disponible</div>
                            <div className="react-calendar-ref-notavailable inline mx"></div>
                            <div className="inline vertical-align">No Disponible</div>
                        </div>
                    </div>
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

