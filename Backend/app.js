const dotenv = require('dotenv'); // Import dotenv to load environment variables from .env file
dotenv.config(); // Load environment variables from .env file
const express = require('express'); // Import Express framework
const cors = require('cors'); // Import CORS middleware
const app = express(); // Create an Express application
const connectToDB = require('./DB/db'); // Import the database connection function



connectToDB(); // Call the function to connect to the database

app.use(cors()); // Use CORS middleware to enable Cross-Origin Resource Sharing

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
// This is a simple Express application that responds with "Hello World!" when the root URL is accessed.