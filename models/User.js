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
  date: {
    type: Date,
    default: Date.now
  },
  super_admin: {
    type: Boolean,
    default: false
  },
  email_verified: {
    type: Boolean,
    default: false
  },

})

module.exports = mongoose.model('user', UserSchema)
