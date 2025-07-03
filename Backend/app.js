/**
 * Express Application Configuration
 * 
 * Main application setup for the Xpressly ride-sharing backend.
 * Configures middleware, routes, and database connection for the API server.
 * Serves as the central entry point for all HTTP requests.
 */

const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDB = require('./DB/db');

// Import route modules for API endpoints
const userRoutes = require('./Routes/user.routes');
const captainRoutes = require('./Routes/captain.routes');
const mapsRoutes = require('./Routes/maps.routes');
const rideRoutes = require('./Routes/ride.routes');

// Initialize database connection on startup
connectToDB();

// Middleware configuration for request processing
app.use(cors()); // Enable Cross-Origin Resource Sharing for frontend communication
app.use(express.json()); // Parse JSON request bodies automatically
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(cookieParser()); // Parse and handle HTTP cookies

// Health check endpoint for service monitoring
app.get('/', (req, res) => {
    res.send('Xpressly API Server Running!');
});

// API route configuration with specific path prefixes
app.use('/users', userRoutes); // User registration, login, and profile management
app.use('/captains', captainRoutes); // Captain authentication and vehicle management
app.use('/maps', mapsRoutes); // Location services and Google Maps integration
app.use('/rides', rideRoutes); // Ride booking, tracking, and completion

// Export configured Express application
module.exports = app;