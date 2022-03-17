const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        required: true 
    },
    duration: {
        type: String
    },
    price: {
        type: Number
    },
    location: {
        type: String,
        required: true
    },
    grading: {
        type: Number
    },
    quota: {
        type: Number
    },
    reservations: {
        type: Number
    }
});

module.exports = Trip = mongoose.model('trip', UserSchema);