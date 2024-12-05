// models/Reservation.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    numberOfPlaces: {
        type: Number,
        required: true
    },
    reservationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = ReservationSchema;
