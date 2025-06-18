const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/registration-flow", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Register Route
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json(user); // Send user data for dashboard
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

// Get All Users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

app.post("/api/register", async (req, res) => {
  const { name, email, password, gender, dob } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password, gender, dob });
    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

