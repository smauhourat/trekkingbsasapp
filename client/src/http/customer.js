import api from '../utils/api';
import handleError from '../utils/helper'

export const getCustomer = async (id) => {
    try {
        const res = await api.get(`/customers/${id}`)
        return res.data
    }
    catch (err) {
        handleError(err, 'Se produjo un error leyendo los datos del Cliente')
    }    
}

export const getCustomers = async () => {

    try {
        const res = await api.get('/customers')
        return res.data.data
    }
    catch (err) {
        handleError(err, 'Se produjo un error leyendo los datos de los Clientes')
    }    

}