import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAccounts, deleteAccount } from '../../http/account'
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux'   
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert'

const AccountsList = ({ setAlert }) => {

    const navigate = useNavigate();

    const queryClient = useQueryClient()

    const { data, isPending, isError } = useQuery({
        queryKey: ['accounts', {}],
        queryFn: () => getAccounts()
    });    

    const mutation = useMutation({
        mutationFn: deleteAccount,
        onSuccess: (data, error, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['accounts'] })
        },
        onError: (error, variables, context) => {
            setAlert(error.message, 'danger')
        }
    })

    const handleDeleteAccount = (e, id) => {
        e.preventDefault()
        mutation.mutate(id)
    }

    const handleEditAccount = (e, id) => {
        e.preventDefault()
        navigate(`/edit-account/${id}`)
    }

    return (
        <>
            <h2 className='my-2'>Cuentas Bancos</h2>
            {isPending && <Spinner />}
            {!isPending && (
                <>  
                    <div className='scroll-x'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th width='15%'><div className='link'>Banco</div></th>
                                    <th width='25%'><div className='link'>Moneda/Tipo</div></th>
                                    <th width='25%'><div className='link'>CBU</div></th>
                                    <th width='25%'><div className='link'>Alias</div></th>
                                    <th width='5%'><div className='link'>Activa</div></th>
                                    <th width='5%'><div className='link'>Acciones</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((account, rowIndex) => 
                                    (<tr key={rowIndex}>
                                        <td>{account.bank}</td>
                                        <td>{account.currency} - {account.account_type}</td>
                                        <td>{account.account_cbu}</td>
                                        <td>{account.account_alias}</td>
                                        <td>{account.active ? 'SI' : 'NO'}</td>
                                        <td className='no-wrap'>
                                            <button
                                                onClick={(e) => handleEditAccount(e, account._id)}
                                                className='btn btn-small btn-square btn-success'
                                            >
                                                <i className='fas fa-edit' title='Editar' />
                                            </button>

                                            <button
                                                onClick={(e) => handleDeleteAccount(e, account._id)}
                                                className='btn btn-small btn-square btn-danger'
                                            >
                                                <i className='fas fa-trash-alt' title='Eliminar' />
                                            </button>
                                        </td>
                                    </tr>)                                
                                )}
                            </tbody>
                        </table>
                    </div>
                </>

            )}
    </>
    )
}

AccountsList.propTypes = {
    setAlert: PropTypes.func.isRequired
}


export default connect(null, { setAlert })(AccountsList)
