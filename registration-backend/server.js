// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Route prefix: '/api'
app.use('/api', authRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/your_db_name')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

