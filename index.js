const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const urlRoutes = require('./src/routes/urlRoutes');

// Initialize Express App
const app = express();

// Connect to MongoDB
require('./src/config/db');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Routes
app.use('/', urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
