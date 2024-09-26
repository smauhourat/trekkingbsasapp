import api from '../utils/api';
import handleError from '../utils/helper'

export const getAccounts = async () => {
    try {
        const res = await api.get(`/accounts`)
        return res.data.data
    }
    catch (err) {
        handleError(err, 'Se produjo un error leyendo los datos')
    }
}

export const getAccount = async(id) => {
    try {
        const res = await api.get(`/accounts/${id}`)
        return res.data
    }
    catch (err) {
        handleError(err, 'Se produjo un error leyendo los datos')
    }
}

export const deleteAccount = async (id) => {
    try {
        const res = await api.delete(`/accounts/${id}`)
        return res
    }
    catch (err) {
        handleError(err, 'Se produjo un error al intentar eliminar la Cuenta.')
    }
}

export const updateAccount = async (account) => {
    try {
        const res = await api.put(`/accounts/${account._id}`, account)
        return res
    }
    catch (err) {
        handleError(err, 'Se produjo un error al intentar actualizar la Cuenta.')
    }
}

export const addAccount = async (account) => {
    try {
        const res = await api.post(`/accounts`, account)
        return res
    }
    catch (err) {
        handleError(err, 'Se produjo un error al intentar agregar la Cuenta.')
    }
}