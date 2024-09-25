import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCustomers } from '../../http/customer'
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert'

const CustomersList = ({ setAlert }) => {

    const navigate = useNavigate();
    const goBack = () => navigate('/');

    const { data, isPending, isError } = useQuery({
        queryKey: ['customers', {}],
        queryFn: () => getCustomers()
    });

    return (
        // <section className='container'>
        <>
            <h2 className='my-2'>Clientes</h2>
            {isPending && <Spinner />}
            {!isPending && (
                <>
                    <div className='scroll-x'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th width='35%'><div className='link'>Nombre</div></th>
                                    <th width='35%'><div className='link'>Email</div></th>
                                    <th width='15%'><div className='link'>DNI</div></th>
                                    <th width='10%'><div className='link'>Telefono</div></th>
                                    <th width='5%'><div className='link'>Acciones</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((customer, rowIndex) =>
                                (<tr key={rowIndex}>
                                    <td>{customer.last_name}, {customer.first_name}</td>
                                    <td>{customer?.user?.email}</td>
                                    <td>{customer.dni}</td>
                                    <td>{customer.phone}</td>
                                    <td className='no-wrap'>
                                        <button
                                            className='btn btn-small btn-square btn-success'
                                        >
                                            <i className='fas fa-edit' title='Editar' />
                                        </button>
                                    </td>
                                </tr>)
                                )}
                            </tbody>
                        </table>
                    </div>
                </>

            )}
            {/* <div className='text-center m-3'>
                <Link onClick={(e) => goBack()} className='btn btn-primary'>
                    <i className='text-primary' /> Volver
                </Link>
            </div> */}

        </>
        // </section>
    )
}

CustomersList.propTypes = {
    setAlert: PropTypes.func.isRequired
}


export default connect(null, { setAlert })(CustomersList)
