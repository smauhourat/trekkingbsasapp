import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAccounts, deleteAccount } from '../../http/account'
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert'
import ConfirmationModal from '../layout/ConfirmationModal'

const ActivitiesList = ({ setAlert }) => {
    

}

ActivitiesList.propTypes = {
    setAlert: PropTypes.func.isRequired
}


export default connect(null, { setAlert })(ActivitiesList)
