const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new mongoose.Schema({
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
  // email_verified: {
  //   type: Boolean,
  //   default: false
  // },
  // email_verification_code: {
  //   type: String
  // }
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'user'
  // },
});

module.exports = mongoose.model('customer', CustomerSchema);