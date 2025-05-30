const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // ✅ correct import

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Use the imported router
app.use("/api", authRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/registrationDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
