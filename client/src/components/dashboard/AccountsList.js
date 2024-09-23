import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAccounts } from '../../http/account'
import Spinner from '../layout/Spinner';

const AccountsList = () => {

    const navigate = useNavigate();
    const goBack = () => navigate('/');

    const { data, isPending, isError } = useQuery({
        queryKey: ['accounts', {}],
        queryFn: () => getAccounts()
    });    


    return (
        <section className='container'>
            <h2 className='my-2'>Cuentas Bancos</h2>
            {isPending && <Spinner />}
            {!isPending && (
                <>  
                    <div className='scroll-x'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th width='15%'><div className='link'>Banco</div></th>
                                    <th width='25%'><div className='link'>Tipo/Moneda</div></th>
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
                                        <td>
                                            <button
                                                onClick={() => deleteAccount(account._id)}
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
            <div className='text-center m-3'>
                <Link onClick={(e) => goBack()} className='btn btn-primary'>
                    <i className='text-primary' /> Volver
                </Link>
            </div>

        </section>
    )
}

export default AccountsList