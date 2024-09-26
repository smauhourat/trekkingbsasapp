import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCustomers } from '../../http/customer'
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert'
import { formatDateTimeBsAs } from '../../utils/dateHelper'
import environment from '../../utils/environment'
import Pagination from '../layout/Pagination'

const CustomersList = ({ setAlert }) => {

    const [currentPage, setCurrentPage] = useState(1);

    const { data, isPending, isError, isFetching, isPreviousData } = useQuery({
        queryKey: ['customers', currentPage],
        queryFn: () => getCustomers(`q=&page=${currentPage}&limit=${environment.recordsPerPage}`),
        keepPreviousData: true
    });

    return (
        <>
            <h2 className='my-2'>Clientes</h2>
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
                                {isPending && (<tr><td colSpan='5'><Spinner /></td></tr>)}
                                {!isPending && (
                                    data?.customers?.map((customer, rowIndex) =>
                                        (<tr key={rowIndex}>
                                            <td>{customer.last_name}, {customer.first_name}</td>
                                            <td>{customer?.user?.email}</td>
                                            <td>{customer.dni}</td>
                                            <td>{customer.phone}</td>
                                            <td className='no-wrap'>{customer?.user?.last_access ? formatDateTimeBsAs(customer?.user?.last_access) : ""}</td>
                                            </tr>)
                                        )
                                    )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan='5'>
                                        <Pagination 
                                            currentPage={currentPage}
                                            totalItems={data?.metadata.total}
                                            onPageChange={(page) => setCurrentPage(page)}
                                            isPreviousData={isPreviousData}
                                        />
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </>
        </>
    )
}

CustomersList.propTypes = {
    setAlert: PropTypes.func.isRequired
}


export default connect(null, { setAlert })(CustomersList)
