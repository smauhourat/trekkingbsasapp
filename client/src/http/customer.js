import api from '../utils/api';
import handleError from '../utils/helper'

export const getCustomer = async (id) => {
    try {
        const res = await api.get(`/customers/${id}`)
        return res.data
    }
    catch (err) {
        throw handleError(err, 'Se produjo un error leyendo los datos del Cliente')
    }    
}

export const getCustomers = async (query='q=') => {

    try {
        // console.log("query =>", query)
        const res = await api.get(`/customers?${query}`)
        // console.log("data =>", res.data)
        return res.data
    }
    catch (err) {
        throw handleError(err, 'Se produjo un error leyendo los datos de los Clientes')
    }    
}

export const getCustomersToExcel = async () => {

    try {
        const res = await api.get(`/customers/toexcel`)
        //console.log("data =>", res.data.data)
        return res.data.data
    }
    catch (err) {
        throw handleError(err, 'Se produjo un error leyendo los datos de los Clientes')
    }
}


export const resendEmailValidation = async (email) => {
    try {
        const res = await api.post(`/customers/verifyemail/${email}`)
        return res.data
    }
    catch (err) {
        throw handleError(err, 'Se produjo un error al intentar enviar el mail de validacion')
    }      
}