const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  full_name: {
    type: String
  },
  email: {
    type: String
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
}, { timestamps: true });

module.exports = mongoose.model('customer', CustomerSchema);