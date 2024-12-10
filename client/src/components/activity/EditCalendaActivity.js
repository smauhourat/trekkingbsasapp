import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAlert, setAlertNavigate } from '../../actions/alert'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EditCalendarActivity = ({
    setAlert,
    setAlertNavigate
}) => {

    const navigate = useNavigate()

    const [value, onChange] = useState(new Date());

    const handleOnClickDay = (value, event) => {
        alert('Clicked day: ', value)
    }

    return (
        <section className='container'>
            <h1 className='large text-primary'>Calendario</h1>
            <Calendar onClickDay={(value, e) => handleOnClickDay(value, e)} onChange={onChange}  value={value} />
        </section>
    )
}

EditCalendarActivity.propTypes = {
    setAlert: PropTypes.func.isRequired,
    setAlertNavigate: PropTypes.func.isRequired
}

export default connect(null, { setAlert, setAlertNavigate })(EditCalendarActivity)

