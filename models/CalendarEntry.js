// models/CalendarEntry.js
const mongoose = require('mongoose');
const ReservationSchema = require('./Reservation');
const Schema = mongoose.Schema;

const CalendarEntrySchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    availableSpots: {
        type: Number,
        required: true
    },
    reservations: [ReservationSchema]
});

//module.exports = mongoose.model('calendarentry', CalendarEntrySchema);
module.exports = CalendarEntrySchema;
