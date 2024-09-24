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
        // console.log('error en http =>', err)
        throw error
    }
}