import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAlert, setAlertNavigate } from '../../actions/alert'
import Calendar from 'react-calendar';

const EditCalendarActivity = ({
    setAlert,
    setAlertNavigate
}) => {

    const navigate = useNavigate()

    return (
        <section className='container'>
            <h1 className='large text-primary'>Calendario</h1>
            <Calendar />
        </section>
    )
}

EditCalendarActivity.propTypes = {
    setAlert: PropTypes.func.isRequired,
    setAlertNavigate: PropTypes.func.isRequired
}

export default connect(null, { setAlert, setAlertNavigate })(EditCalendarActivity)

