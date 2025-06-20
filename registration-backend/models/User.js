const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  gender: String,
  dob: String,
  profilePhoto: String,
});

module.exports = mongoose.model("User", userSchema);
