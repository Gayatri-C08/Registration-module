const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  email: { type: String, unique: true },
  password: String,
  dateOfBirth: Date,
  phoneNumber: String
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
