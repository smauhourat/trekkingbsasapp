const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  dni: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  birth_date: {
    type: Date,
    required: true
  },
  medical_status: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('customer', CustomerSchema);