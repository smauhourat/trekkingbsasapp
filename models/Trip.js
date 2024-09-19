const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  },
  description: {
    type: String,
    required: true
  },
  itinerary: {
    type: String
  },
  suggested_equipment: {
    type: String
  },
  included_services: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date
    // required: true
  },
  departure: {
    type: String
  },
  arrival: {
    type: String
  },
  duration: {
    type: String
  },
  price: {
    type: Number
  },
  booking_price: {
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
    type: Number,
    default: 0
  },
  reservations: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: true
  },
  training_level: {
    type: String
  },
  payment_link: {
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
})

module.exports = mongoose.model('trip', TripSchema)
