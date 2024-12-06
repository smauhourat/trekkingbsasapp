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
});

module.exports = ReservationSchema;