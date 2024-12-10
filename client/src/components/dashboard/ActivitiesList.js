import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getActivities, deleteActivity } from '../../http/activity'
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert'
import ConfirmationModal from '../layout/ConfirmationModal'

const ActivitiesList = ({ setAlert }) => {

    const navigate = useNavigate();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState()

    const queryClient = useQueryClient()

    const { data, isPending, isError } = useQuery({
        queryKey: ['activities', {}],
        queryFn: () => getActivities()
    });

    const mutation = useMutation({
        mutationFn: deleteActivity,
        onSuccess: (data, error, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['activities'] })
        },
        onError: (error, variables, context) => {
            setAlert(error.message, 'danger')
        }
    })

    const handleEditActivity = (e, id) => {
        e.preventDefault()
        navigate(`/edit-activity/${id}`)
    }

    const handleDeleteActivityModal = (e, id) => {
        e.preventDefault()
        setIdToDelete(id)
        setShowConfirmationModal(true)
    }

    const handleCancelDelete = () => {
        setShowConfirmationModal(false);
    }

    const handleOkDelete = (id) => {
        setShowConfirmationModal(false);
        setIdToDelete(null)
        mutation.mutate(id)
    }      

    return (
        <>
            <h2 className='my-2'>Actividades</h2>
            {isPending && <Spinner />}
            {!isPending && (
                <>
                    <div className='scroll-x'>
                        <table id="test_table_accounts" className='table'>
                            <thead>
                                <tr>
                                    <th width='60%'><div className='link'>Titulo</div></th>
                                    <th width='5%'><div className='link'>Cupo</div></th>
                                    <th width='5%'><div className='link'>Reservas</div></th>
                                    <th width='5%'><div className='link'>Publicado</div></th>
                                    <th width='25%'><div className='link'>Acciones</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item, rowIndex) =>
                                (<tr key={rowIndex}>
                                    <td>{item.title}</td>
                                    <td style={{ textAlign: 'center' }}>{item.quota}</td>
                                    <td style={{ textAlign: 'center' }}>{item.quota}</td>
                                    <td style={{ textAlign: 'center' }}>{item.published ? 'SI' : 'NO'}</td>
                                    <td style={{ textAlign: 'center' }} className='no-wrap'>
                                        <button
                                            onClick={(e) => handleEditActivity(e, item._id)}
                                            className='btn btn-small btn-square btn-success'
                                        >
                                            <i className='fas fa-edit' title='Editar' />
                                        </button>
                                        <button name="test_delete_row"
                                            className='btn btn-small btn-square btn-danger'
                                            onClick={(e) => handleDeleteActivityModal(e, item._id)}>
                                            <i className='fas fa-trash-alt' title='Eliminar' />
                                        </button>
                                    </td>
                                </tr>)
                                )}
                            </tbody>
                        </table>
                        <ConfirmationModal show={showConfirmationModal} message="Está seguro que desea eliminar la Actividad?" params={idToDelete} onCancel={handleCancelDelete} onOk={handleOkDelete} />
                    </div>
                </>

            )}
        </>
    )

}

ActivitiesList.propTypes = {
    setAlert: PropTypes.func.isRequired
}


export default connect(null, { setAlert })(ActivitiesList)
