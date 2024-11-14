import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCustomers, getCustomersToExcel } from '../../http/customer'
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert'
import { formatDateTimeBsAs, formatDate } from '../../utils/dateHelper'
import environment from '../../utils/environment'
import Pagination from '../layout/Pagination'
import exportToExcel from '../../utils/exportToExcel'

const CustomersList = ({ setAlert }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState('last_name')
    const [order, setOrder] = useState(-1)
    const [search, setSearch] = useState('')
    const [triggerSearch, setTriggerSearch] = useState(false)

    //const columnHeaders = ['_id', 'Nombre', 'Apellido']
    const columnHeaders = []

    const handleExport = async () => {
        const data = await getCustomersToExcel()
        console.log(data)
        exportToExcel(data, 'customers-all', columnHeaders);
    };    

    const handleOnChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleOnKeyDownSearch = (e) => {
        if (e.key === 'Enter') {
            setTriggerSearch(!triggerSearch)
        }
    }

    const handleOnClickSearch = (e) => {
        setTriggerSearch(!triggerSearch)
        // console.log('triggerSearch =>', triggerSearch)
    }

    const sortOrderIcon = (e) => {
        const classIcon = order === 1 ? 'fas fa-arrow-down' : 'fas fa-arrow-up'
        return e === sort ? <i className={classIcon} /> : ''
    }

    const handleOnChangeOrder = (e) => {
        setSort(e)
        setOrder(order === 1 ? -1 : 1)
        setCurrentPage(1)
    }

    const { data, isPending, isError, isFetching, isPreviousData } = useQuery({
        queryKey: ['customers', currentPage, triggerSearch, sort, order],
        queryFn: () => getCustomers(`q=${search}&page=${currentPage}&limit=${environment.recordsPerPage}&sort=${sort}&order=${order}`),
        keepPreviousData: true
    });

    return (
        <>
            <h2 className='my-2'>Clientes</h2>
            <div className='search-panelXX'>
                <input type='text' className='input-text' value={search} onChange={handleOnChangeSearch} onKeyDown={handleOnKeyDownSearch} /><button className='btn btn-primary btn-link' onClick={handleOnClickSearch}><i className='fas fa-search' title='Buscar' /></button>
                <button className='btn btn-success' onClick={handleExport}><i className='fas fa-file-excel' title='Exportar a Excel' /></button>
            </div>
            <div className='scroll-x'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th width='35%'><div className='link' onClick={() => handleOnChangeOrder('full_name')}>Nombre {sortOrderIcon('full_name')}</div></th>
                            <th width='30%'><div className='link' onClick={() => handleOnChangeOrder('email')}>Email {sortOrderIcon('email')}</div></th>
                            <th width='15%'><div className='link' onClick={() => handleOnChangeOrder('dni')}>DNI {sortOrderIcon('dni')}</div></th>
                            <th width='10%'><div className='link'>Telefono</div></th>
                            <th width='5%'><div className='link'>Ult. Acceso</div></th>
                            <th width='5%'><div className='link'>F. Alta</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isPending && (<tr><td colSpan='6'><Spinner /></td></tr>)}
                        {!isPending && (
                            data?.customers?.map((customer, rowIndex) =>
                                (
                                <tr key={rowIndex}>
                                    <td>{customer.last_name}, {customer.first_name}</td>
                                    <td>{customer?.user?.email}</td>
                                    <td>{customer.dni}</td>
                                    <td>{customer.phone}</td>
                                    <td className='no-wrap'>{customer?.user?.last_access ? formatDateTimeBsAs(customer?.user?.last_access) : ""}</td>
                                    <td className='no-wrap'>{customer?.createdAt ? formatDate(customer?.createdAt) : ""}</td>
                                </tr>)
                                )
                            )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan='6'>
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
    )
}

CustomersList.propTypes = {
    setAlert: PropTypes.func.isRequired
}


export default connect(null, { setAlert })(CustomersList)
