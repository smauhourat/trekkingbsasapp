const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    category: {
        type: String
        // type: Schema.Types.ObjectId,
        // ref: 'tripcategories'
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
        type: Date
        //required: true 
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
    },
    suggested_equipment: {
        type: String
    },
    images: [
        {
            url: {
                type: String
            },
            public_id: {
                type: String
            },
            width: {
                type: Number
            },
            height: {
                type: Number
            },
            format: {
                type: String
            },
            resource_type: {
                type: String
            },
            created_at: {
                type: Date
            },
            bytes: {
                type: Number
            }
        }
    ]
});

module.exports = mongoose.model('trip', TripSchema);