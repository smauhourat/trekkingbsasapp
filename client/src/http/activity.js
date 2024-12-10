import api from '../utils/api';
import handleError from '../utils/helper'

export const getActivities = async (publishedFilter=false) => {
    try {
        const url = publishedFilter ? '/?published=1' :  ''
        const res = await api.get(`/activities${url}`)
        return res.data.data
    }
    catch (err) {
        throw handleError(err, 'Se produjo un error leyendo los datos')
    }
}

export const getActivity = async (id) => {
    try {
        const res = await api.get(`/activities/${id}`)
        return res.data
    }
    catch (err) {
        throw handleError(err, 'Se produjo un error leyendo los datos')
    }
}

export const deleteActivity = async (id) => {
    try {
        const res = await api.delete(`/activities/${id}`)
        return res
    }
    catch (err) {
        throw handleError(err, 'Se produjo un error al intentar eliminar la Actividad.')
    }
}

export const updateActivity = async (activity) => {
    try {
        const res = await api.put(`/activities/${activity._id}`, activity)
        return res
    }
    catch (err) {
        throw handleError(err, 'Se produjo un error al intentar actualizar la Actividad.')
    }
}

export const addActivity = async (activity) => {
    try {
        const res = await api.post(`/activities`, activity)
        return res
    }
    catch (err) {
        throw handleError(err, 'Se produjo un error al intentar agregar la Actividad.')
    }
}