const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('tripcategory', TripCategorySchema);