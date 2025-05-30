const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: String,
  phoneNumber: String
});

module.exports = mongoose.model('User', userSchema);
