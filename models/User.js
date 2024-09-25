const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
    //unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  super_admin: {
    type: Boolean,
    default: false
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  last_access: {
    type: Date
  }

}, { timestamps: true })

module.exports = mongoose.model('user', UserSchema)
