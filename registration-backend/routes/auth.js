const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/userAuth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  gender: String,
  dob: String,
});

const User = mongoose.model("User", UserSchema);

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, gender, dob } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      dob,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
