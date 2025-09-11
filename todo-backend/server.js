// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const todoRoutes = require('./routes/todo.routes');

// Initialize Express app
const app = express();

const corsOptions = {
  // This is the important part!
  // It tells your backend to accept requests from this specific URL.
  origin: 'https://todo-appapi.netlify.app'
};

app.use(cors(corsOptions));


// Middleware
// app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/todos', todoRoutes);

// Simple route for home
app.get('/', (req, res) => {
    res.send('To-Do List API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});