import api from '../utils/api';

export const createBookOrder = async (bookData, orderData) => {
    try {
        const book = await api.post(`/books/`, bookData);
        if (book) {
            const res = await api.post(`/books/create-order/`, { ...orderData, bookId: book.data._id });
            console.log(res);
            return res;
        }
        return;
    } catch (err) {
        console.log(err.response.data);
        throw err;
    }
}

export const createBook = async (customer, trip, price, description) => {
    try {
        const res = await api.post(`/books/`, { customer, trip, price, description })
        const book = res.data
        
        return book
    } catch (err) {
        console.log(err.response.data)
        throw err
    }    
}

export const updateBookPayment = async (bookId, transaction_number) => {
    try {
        const book = await api.put(`/books/`, { customer, trip, price, description })

        return book
    } catch (err) {
        console.log(err.response.data)
        throw err
    }
}

export const sendBookingEmail = async (bookId) => {
    try {
        const res = await api.post(`/books/${bookId}/sendmail`);
        console.log(res);

    } catch (err) {
        console.log(err.response.data)
        throw err
    }
}