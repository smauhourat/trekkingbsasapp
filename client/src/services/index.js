import api from '../utils/api';

export const createBookOrder = async (bookData, orderData) => {
    try {
        const book = await api.post(`/books/`, bookData);
        if (book) {
            const res = await api.post(`/payments/create-order/`, { ...orderData, bookId: book.data._id });
            console.log(res);
            return res;
        }
        return;
    } catch (err) {
        console.log(err.response.data);
        throw err;
    }
}