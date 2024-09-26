import React from 'react'
import environment from '../../utils/environment'

const Pagination = ({
    currentPage,
    totalItems,
    limitItems,
    onPageChange,
    isPreviousData,
}) => {
    const pageCount = Math.ceil(totalItems / environment.recordsPerPage);

    const goToPrevPage = () => onPageChange(currentPage - 1);
    const goToNextPage = () => onPageChange(currentPage + 1);

    return (
        <div>
            <button
                onClick={goToPrevPage}
                className='btn btn-primary btn-small'
                title='Anterior'
                disabled={currentPage === 1 || isPreviousData}
            >
                <li className='fas fa-angle-left' />
            </button>

            <button
                onClick={goToNextPage}
                className='btn btn-primary btn-small'
                title='Siguiente'
                disabled={currentPage === pageCount || isPreviousData}
            >
                <li className='fas fa-angle-right' />
            </button>
            <div className='tiny inline'>
                Página {currentPage} de {Math.ceil(totalItems / limitItems)} - total de registros: {totalItems}
                {/* Página {trips?.metadata?.page} de {Math.ceil(trips?.metadata?.total / trips?.metadata?.limit)} - total de registros: {trips?.metadata?.total} */}
            </div>
        </div>
    )
}

export default Pagination