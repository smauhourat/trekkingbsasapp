import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCustomers } from '../../http/customer'
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert'
import formatDateTimeBsAs from '../../utils/formatDateTimeBsAs'

const CustomersList = ({ setAlert }) => {

    const { data, isPending, isError } = useQuery({
        queryKey: ['customers', {}],
        queryFn: () => getCustomers()
    });

    return (
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
                                    <th width='5%'><div className='link'>Ult. Acceso</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((customer, rowIndex) =>
                                (<tr key={rowIndex}>
                                    <td>{customer.last_name}, {customer.first_name}</td>
                                    <td>{customer?.user?.email}</td>
                                    <td>{customer.dni}</td>
                                    <td>{customer.phone}</td>
                                    <td className='no-wrap'>{customer?.user?.last_access ? formatDateTimeBsAs(customer?.user?.last_access) : ""}</td>
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

CustomersList.propTypes = {
    setAlert: PropTypes.func.isRequired
}


export default connect(null, { setAlert })(CustomersList)
