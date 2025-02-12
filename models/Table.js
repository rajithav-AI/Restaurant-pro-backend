const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
    tableNumber: { type: Number, required: true, unique: true },
    capacity: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reservationTime: { type: Date }
  });
  
  module.exports = mongoose.model('Table',TableSchema );