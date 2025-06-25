const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({  
    token: { 
        type: String,   // Define the type of the token field as String
        required: true, // Ensure that the token is required 
        unique: true    // Ensure that the token is unique
    },
    createdAt: { 
        type: Date,         // Define the type of the createdAt field as Date
        default: Date.now,  // Set the default value of createdAt to the current date and time
        expires: 86400 }    // 86400 seconds = 24 hours
});

module.exports = mongoose.model('blacklistToken', blacklistTokenSchema); // Export the model for use in other parts of the application
// This model is used to store blacklisted tokens in the database, with a TTL (time-to-live) of 24 hours.