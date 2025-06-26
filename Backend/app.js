const dotenv = require('dotenv'); // Import dotenv to load environment variables from .env file
dotenv.config(); // Load environment variables from .env file
const express = require('express'); // Import Express framework
const cors = require('cors'); // Import CORS middleware
const app = express(); // Create an Express application
const cookieParser = require('cookie-parser'); // Import cookie-parser middleware
const connectToDB = require('./DB/db'); // Import the database connection function
const userRoutes = require('./Routes/user.routes'); // Import user routes
const captainRoutes = require('./Routes/captain.routes'); // Import captain routes
const mapsRoutes = require('./Routes/maps.routes'); // Import maps routes
const rideRoutes = require('./Routes/ride.routes'); // Import ride routes



connectToDB(); // Call the function to connect to the database


app.use(cors()); // Use CORS middleware to enable Cross-Origin Resource Sharing
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies
app.use(cookieParser()); // Middleware to parse cookies from request headers



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRoutes); // Use user routes for API requests
app.use('/captains', captainRoutes); // Use captain routes for API requests
app.use('/maps', mapsRoutes);   // Use maps routes for API requests
app.use('/rides', rideRoutes); // Use ride routes for API requests


module.exports = app;
// This is a simple Express application that responds with "Hello World!" when the root URL is accessed.