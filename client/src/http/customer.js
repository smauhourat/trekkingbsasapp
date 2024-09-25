import api from '../utils/api';

export const getCustomer = async (id) => {
    try {
        const res = await api.get(`/customers/${id}`)

        return res.data
    }
    catch (err) {
        const error = new Error('Se produjo un error leyendo los datos del Cliente');
        error.code = err.response.status
        error.info = err.response.data
        throw error
    }    
}

export const getCustomers = async () => {

    try {
        const res = await api.get('/customers')
        
        return res.data.data
    }
    catch (err) {
        const error = new Error('Se produjo un error leyendo los datos de los Clientes');
        error.code = err.response.status
        error.info = err.response.data
        throw error
    }    

}