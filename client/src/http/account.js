import api from '../utils/api';

export const getAccounts = async () => {
    try {
        const res = await api.get(`/accounts`)

        return res.data.data
    }
    catch (err) {
        const error = new Error('Se produjo un error leyendo los datos');
        error.message += err.response.data?.msg ? ` ${err.response.data?.msg}` : ""
        error.code = err.response.status
        error.info = err.response.data
        throw error
    }
}

export const getAccount = async(id) => {
    try {
        const res = await api.get(`/accounts/${id}`)
        console.log(res)
        return res.data
    }
    catch (err) {
        const error = new Error('Se produjo un error leyendo los datos');
        error.message += err.response.data?.msg ? ` ${err.response.data?.msg}` : ""
        error.code = err.response.status
        error.info = err.response.data
        throw error
    }
}

export const deleteAccount = async (id) => {
    try {
        const res = await api.delete(`/accounts/${id}`)

        return res
    }
    catch (err) {
        const error = new Error('Se produjo un error al intentar eliminar la Cuenta.');
        error.message += err.response.data?.msg ? ` ${err.response.data?.msg}` : ""
        error.code = err.response.status
        error.info = err.response.data
        throw error
    }
}

export const updateAccount = async (account) => {
    try {

        const res = await api.put(`/accounts/${account._id}`, account)

        return res
    }
    catch (err) {

        const errors = err.response?.data?.errors

        const error = new Error('Se produjo un error al intentar actualizar la Cuenta.');
        error.message += err.response.data?.msg ? ` ${err.response.data?.msg}` : ""
        error.code = err.response.status
        error.info = err.response.data
        error.errors = errors
        console.log('error en http =>', JSON.stringify(err))
        throw error
    }
}