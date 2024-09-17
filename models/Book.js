//https://www.mercadopago.com.ar/developers/es/reference/payments/_payments_id/get
//https://www.mercadopago.com.ar/developers/es/reference/merchant_orders/_merchant_orders_id/get
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },

    trip: {
        type: Schema.Types.ObjectId,
        ref: 'trip'
    },

    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer'
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String
    },

    status: {
        type: String,
        default: 'pendiente'
    },

    accounts: [
        {
            bank: {
                type: String
            },
            currency: {
                type: String
            },
            account_type: {
                type: String
            },
            account_number: {
                type: String
            },
            account_cbu: {
                type: String
            },
            account_alias: {
                type: String
            },
        }
    ],
    transaction_number: {
        type: Number
    }

}, { timestamps: true });

module.exports = mongoose.model('book', BookSchema);