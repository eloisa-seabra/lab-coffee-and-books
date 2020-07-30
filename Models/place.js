const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['coffee_shop', 'bookstore'],
      required: true
    },
    location: {
      coordinates: [
        {
          type: Number,
          min: -180,
          max: 180
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
