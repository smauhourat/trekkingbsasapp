import api from '../utils/api';

export const getAccounts = async () => {
    try {
        const res = await api.get(`/accounts`)
        console.log('res.data =>', res.data)
        console.log('res.data.data =>', res.data.data)
        return res.data.data
    }

    catch (err) {
        const error = new Error('Se produjo un error leyendo los datos');
        error.code = err.response.status
        error.info = err.response.data
        throw error
    }
}