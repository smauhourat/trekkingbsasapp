// models/Reservation.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer'
    },
    numberOfPlaces: {
        type: Number,
        required: true
    },
    reservationDate: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
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
            account_holder: {
                type: String
            },
            account_cuit: {
                type: String
            }
        }
    ],
    transaction_number: {
        type: String
    }

});

module.exports = ReservationSchema;
