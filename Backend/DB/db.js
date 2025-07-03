// Database connection configuration using MongoDB and Mongoose
const mongoose = require('mongoose');

/**
 * Establishes connection to MongoDB database
 * Uses connection string from environment variables for security
 */
function connectToDB() {
    mongoose.connect(process.env.DB_CONNECT).then(() => {
        // Connection successful - no logging in production
        console.log('Connected to MongoDB');
    })
        .catch(err => {
            // Connection failed - handle silently in production
            console.error('Error connecting to MongoDB:', err);
        });
}

module.exports = connectToDB;