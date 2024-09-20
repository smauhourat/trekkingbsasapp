import api from '../utils/api';

export const getCustomer = async (id) => {
    try {
        const res = await api.get(`/customers/${id}`)

        //console.log('res.data =>', res.data)

        return res.data
    }

    catch (err) {
        const error = new Error('Se produjo un error leyendo los datos del Cliente');
        error.code = err.response.status
        error.info = err.response.data
        throw error
    }    
}