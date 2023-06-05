const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new mongoose.Schema({

    book: {
        type: Schema.Types.ObjectId,
        ref: 'books'
    },

    mp_preference_id: {
        type: String,
        required: true
    },

    date_created: {
        type: Date
    },
    
    item: [{
            title: {
                type: String
            },
            description: {
                type: String
            },
            unit_price: {
                type: Number
            }
            }]

});

module.exports = mongoose.model('payment', PaymentSchema);