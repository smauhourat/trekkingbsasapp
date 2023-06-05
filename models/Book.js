const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new mongoose.Schema({

    trip: {
        type: Schema.Types.ObjectId,
        ref: 'trips'
    },

    member: {
        type: Schema.Types.ObjectId,
        ref: 'trips'
    },

    price: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        default: 'pending'
    }


});

module.exports = mongoose.model('book', BookSchema);