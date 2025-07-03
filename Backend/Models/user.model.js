/**
 * User Model
 * 
 * Mongoose schema for user authentication and profile management.
 * Includes password hashing, JWT token generation, and user validation.
 * Used for passenger registration, login, and session management.
 */

const mongoose = require('mongoose'); // MongoDB object modeling library
const bcrypt = require('bcrypt'); // Password hashing utility
const jwt = require('jsonwebtoken'); // JWT token creation and verification

// User schema definition with validation rules
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"]
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique email addresses
        minlength: [5, "Email must be at least 5 characters long"],
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from queries by default for security
    },
    socketId: {
        type: String, // Store real-time connection ID for live features
    },
});

/**
 * Generate JWT authentication token for user
 * @returns {string} JWT token with 24-hour expiration
 */
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

/**
 * Compare provided password with stored hashed password
 * @param {string} password - Plain text password to verify
 * @returns {boolean} True if password matches, false otherwise
 */
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

/**
 * Static method to hash password before storing
 * @param {string} password - Plain text password to hash
 * @returns {string} Hashed password with salt rounds of 10
 */
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

// Create and export user model
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;