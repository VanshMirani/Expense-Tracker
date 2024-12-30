const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
origin: 'http://localhost:5001', 
methods= ['GET', 'POST', 'PUT', 'DELETE'],
credentials = true 
;
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Expense model
const Expense = require('./models/Expense');

// Routes
app.use('/api/expenses', require('./routes/expenses'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});