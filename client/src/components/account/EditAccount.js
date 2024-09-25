import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAlert, setAlertNavigate } from '../../actions/alert'
import { getAccount, updateAccount } from '../../http/account'
import Spinner from '../layout/Spinner'

const EditAccount = ({
    setAlert,
    setAlertNavigate
}) => {
    const navigate = useNavigate()

    const id = useParams().id

    const { data: account, isPending, isError } = useQuery({
        queryKey: ['account', id],
        queryFn: () => getAccount(id)
    });      

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: updateAccount,
        onSuccess: (data, error, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['account'] })
            setAlertNavigate('Los datos se han actualizado correctamente.', 'success', navigate, '/accounts', 2500)
        },
        onError: (error, variables, context) => {
            console.log(error)
            if (error.errors) {
                error.errors.forEach(err => setAlert(err.msg, 'danger'))
            }
            setAlert(error.message, 'danger')
        }
    })

    const [editedAccount, setEditedAccount] = useState({
        bank: '',
        currency: '',
        account_type: '',
        account_number: '',
        account_cbu: '',
        account_alias: '',
        active: true
    })

    // console.log('editedAccount =>', editedAccount)
    useEffect(() => {
        if (!isPending)
            setEditedAccount(account)
    }, [isPending, account])

    if (isPending)
        return (<Spinner />)

    const { bank, currency, account_type, account_number, account_cbu, account_alias, active } = editedAccount

    const onChange = (e) => {
        const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setEditedAccount({ ...editedAccount, [e.target.name]: newValue })
    }

    const validateForm = () => {
        // if (reservations > quota) {
        //     setAlert('Las Reservas no pueden ser mayores al Cupo', 'danger')
        //     return false
        // }
        return true
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            mutation.mutate({ ...editedAccount })
        }
    }

    return (
        <section className='container'>
            <h1 className='large text-primary'>Cuentas Bancarias</h1>
            <p className='lead'><i className='fas fa-calendar' /> Actualizar Cuenta</p>
            <p className='mini'>Los campos marcados con <span className='mark-danger'>*</span> son obligatorios</p>
            <form
                className='form'
                onSubmit={e => onSubmit(e)}
            >
                <div className='form-group'>
                    <label className='mark-danger small'>*</label> <label>Banco</label>
                    <input
                        type='text'
                        placeholder='Banco'
                        name='bank'
                        value={bank}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='mark-danger small'>*</label> <label>Nro. Cuenta</label>
                    <input
                        type='text'
                        placeholder='Nro Cuenta'
                        name='account_number'
                        value={account_number}
                        onChange={onChange}
                        required
                    />
                </div>                
                <div className='form-group'>
                    <label className='mark-danger small'>*</label> <label>Moneda</label>
                    <input
                        type='text'
                        placeholder='Moneda'
                        name='currency'
                        value={currency}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='mark-danger small'>*</label> <label>Tipo Cuenta</label>
                    <input
                        type='text'
                        placeholder='Tipo Cuenta'
                        name='account_type'
                        value={account_type}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='mark-danger small'>*</label> <label>CBU</label>
                    <input
                        type='text'
                        placeholder='CBU'
                        name='account_cbu'
                        value={account_cbu}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='mark-danger small'>*</label> <label>Alias</label>
                    <input
                        type='text'
                        placeholder='Alias'
                        name='account_alias'
                        value={account_alias}
                        onChange={onChange}
                        required
                    />
                </div>                
                <div className='form-group'>
                    <input
                        type='checkbox'
                        name='active'
                        checked={active}
                        onChange={onChange}
                    />
                    <label>Activa</label>
                </div>
                <input type='submit' className='btn btn-primary' value='Aceptar' />
                <input type='button' className='btn btn-secondary' value='Cancelar' onClick={() => navigate('/accounts')} />
            </form>
        </section>
    )
}

EditAccount.propTypes = {
    setAlert: PropTypes.func.isRequired,
    setAlertNavigate: PropTypes.func.isRequired
}

export default connect(null, { setAlert, setAlertNavigate })(EditAccount)