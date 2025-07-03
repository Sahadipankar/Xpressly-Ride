/**
 * BlacklistToken Model
 * 
 * Mongoose schema for managing invalidated JWT tokens during logout.
 * Implements automatic token expiration using TTL (Time To Live) index.
 * Prevents reuse of logged-out tokens for enhanced security.
 */

const mongoose = require('mongoose');

// Blacklist token schema with automatic expiration
const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String, // JWT token to be blacklisted
        required: true, // Token is required field
        unique: true // Ensure each token can only be blacklisted once
    },
    createdAt: {
        type: Date, // Timestamp when token was blacklisted
        default: Date.now, // Automatically set to current date/time
        expires: 86400 // TTL: Auto-delete after 24 hours (86400 seconds)
    }
});

// Export blacklist token model for logout functionality
module.exports = mongoose.model('blacklistToken', blacklistTokenSchema);