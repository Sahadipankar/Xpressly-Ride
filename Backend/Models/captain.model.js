/**
 * Captain Model
 * 
 * Mongoose schema for captain (driver) authentication and profile management.
 * Includes vehicle details, location tracking, status management, and security features.
 * Used for driver registration, login, ride assignment, and location services.
 */

const mongoose = require('mongoose'); // MongoDB object modeling library
const bcrypt = require('bcrypt'); // Password hashing utility
const jwt = require('jsonwebtoken'); // JWT token creation and verification

// Captain schema definition with comprehensive validation
const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique email addresses
        lowercase: true, // Store emails in lowercase
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from queries by default for security
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    socketId: {
        type: String, // Store real-time connection ID for live tracking
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], // Captain availability status
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long'],
            unique: true, // Ensure unique license plates
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'], // Minimum passenger capacity
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['Car', 'Auto', 'Moto'], // Supported vehicle types
        },
    },
    location: {
        ltd: {
            type: Number, // Latitude coordinate for GPS tracking
        },
        lng: {
            type: Number, // Longitude coordinate for GPS tracking
        },
    }
})

/**
 * Generate JWT authentication token for captain
 * @returns {string} JWT token with 24-hour expiration
 */
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

/**
 * Compare provided password with stored hashed password
 * @param {string} password - Plain text password to verify
 * @returns {boolean} True if password matches, false otherwise
 */
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

/**
 * Static method to hash password before storing
 * @param {string} password - Plain text password to hash
 * @returns {string} Hashed password with salt rounds of 10
 */
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

// Create and export captain model
const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel;