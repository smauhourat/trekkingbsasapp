const mongoose = require('mongoose')

const TripSchema = new mongoose.Schema({
  online: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model('appconf', TripSchema)
