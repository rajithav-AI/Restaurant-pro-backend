const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  amenities: { type: [String], required: true },
  pricePerNight: { type: Number, required: true }
});

module.exports = mongoose.model('Hotel', HotelSchema);