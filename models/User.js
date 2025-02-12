const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "customer", "staff"], default: "customer" },
  isAdmin: { type: Boolean, require:true },
  phone: { type: String },
  address: { type: String },
  profilePic: { type: String, required: false },
createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);