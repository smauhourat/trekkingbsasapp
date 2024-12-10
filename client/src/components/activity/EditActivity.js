import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAlert, setAlertNavigate } from '../../actions/alert'
import { getActivity, updateActivity } from '../../http/activity'
import training_levels from '../../models/TrainingLevel.json'
import Spinner from '../layout/Spinner'

const EditActivity = ({
    setAlert,
    setAlertNavigate
}) => {
    const navigate = useNavigate()

    const id = useParams().id

    const { data: activity, isPending, isError } = useQuery({
        queryKey: ['activity', id],
        queryFn: () => getActivity(id)
    });          

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: updateActivity,
        onSuccess: (data, error, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['activity'] })
            setAlertNavigate('La Actividad se ha modificado correctamente.', 'success', navigate, '/dashboard', 2500)
        },
        onError: (error, variables, context) => {
            setAlert(error.message, 'danger')
            if (error.errors) {
                error.errors.forEach(err => setAlert(err.msg, 'danger'))
            }
        }
    })

    const [editedActivity, setEditedActivity] = useState({
        title: '',
        subtitle: '',
        category: '',
        description: '',
        itinerary: '',
        duration: '',
        price: '',
        location: '',
        quota: '',
        published: true,
        suggested_equipment: '',
        included_services: '',
        booking_price: '',
        training_level: '',
    })

    useEffect(() => {
        if (!isPending)
            setEditedActivity(activity)
    }, [isPending, activity])

    if (isPending)
        return (<Spinner />)

    const { title, subtitle, category, description, itinerary, duration, price, location, quota, published, suggested_equipment, included_services, booking_price, training_level } = editedActivity

    const onChange = (e) => {
        const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setEditedActivity({ ...editedActivity, [e.target.name]: newValue })
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
            mutation.mutate({ ...editedActivity })
        }
    }

    return (
        <section className='container'>
            <h1 className='large text-primary'>Actividades</h1>
            <p className='lead'><i className='fas fa-book' /> Actualizar Actividad</p>
            <p className='mini'>Los campos marcados con <span className='mark-danger'>*</span> son obligatorios</p>
            <form
                className='form'
                onSubmit={e => onSubmit(e)}
            >
                <div className='form-group'>
                    <label className='mark-danger small'>*</label> <label>Titulo</label>
                    <input
                        type='text'
                        placeholder='Titulo'
                        name='title'
                        value={title}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='mark-danger small'>*</label> <label>Subtitulo</label>
                    <input
                        type='text'
                        placeholder='Subtitulo'
                        name='subtitle'
                        value={subtitle}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='mark-danger small'>*</label> <label>Lugar</label>
                    <input
                        type='text'
                        placeholder='Lugar'
                        name='location'
                        value={location}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label className='mark-danger small'>*</label> <label>Categoria</label>
                    <select name='category' value={category} onChange={onChange} required>
                        <option value=''>* Selecione una Categoria</option>
                        <option value='Trekking'>Trekking</option>
                        <option value='Caminatas'>Caminatas</option>
                        <option value='Mountain Bike'>Mountain Bike</option>
                        <option value='Kayaks'>Kayaks</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label className='mark-danger small'>*</label> <label>Descripcion</label>
                    <textarea
                        placeholder='Descripcion'
                        rows='5'
                        name='description'
                        value={description}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Itinerario</label>
                    <textarea
                        placeholder='Itinerario'
                        rows='5'
                        name='itinerary'
                        value={itinerary}
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <label>Equipo Sugerido</label>
                    <textarea
                        placeholder='Equipo Sugerido'
                        rows='5'
                        name='suggested_equipment'
                        value={suggested_equipment}
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <label>Servicios Incluidos</label>
                    <textarea
                        placeholder='Servicios Incluidos'
                        rows='5'
                        name='included_services'
                        value={included_services}
                        onChange={onChange}
                    />
                </div>

                <div className='form-group'>
                    <label>Duración</label>
                    <input
                        type='text'
                        placeholder='Duracion'
                        name='duration'
                        value={duration}
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <label>Precio</label>
                    <input
                        type='text'
                        placeholder='Precio'
                        name='price'
                        value={price}
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <label>Precio Reserva</label>
                    <input
                        type='text'
                        placeholder='Precio Reserva'
                        name='booking_price'
                        value={booking_price}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label className='mark-danger small'>*</label> <label>Nivel Entrenamiento</label>
                    <select name='training_level' value={training_level} onChange={onChange} required>
                        <option value=''>* Selecione un Nivel</option>
                        {training_levels.training_levels.map((item) => {
                            return <option key={item.order} value={item.name}>{item.name}</option>
                        })}
                    </select>
                </div>
                <div className='form-group'>
                    <label>Cupo</label>
                    <input
                        type='text'
                        placeholder='Cupo'
                        name='quota'
                        pattern='[0-9]*'
                        value={quota}
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='checkbox'
                        name='published'
                        checked={published}
                        onChange={onChange}
                    />
                    <label>Publicado</label>
                </div>
                
                <input type='submit' id='form-account-submit-button' className='btn btn-primary' value='Aceptar' />
                <input type='button' className='btn btn-secondary' value='Cancelar' onClick={() => navigate('/dashboard')} />
            </form>
        </section>
    )
}

EditActivity.propTypes = {
    setAlert: PropTypes.func.isRequired,
    setAlertNavigate: PropTypes.func.isRequired
}

export default connect(null, { setAlert, setAlertNavigate })(EditActivity)