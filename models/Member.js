const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dni: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    allergic: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('member', MemberSchema);