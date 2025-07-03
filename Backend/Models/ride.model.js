/**
 * Ride Model
 * 
 * MongoDB schema for ride management in the Xpressly ride-sharing platform.
 * Defines the complete ride lifecycle from creation to completion with
 * user-captain relationships, location data, and payment tracking.
 */

const mongoose = require('mongoose');

/**
 * Ride Schema Definition
 * Comprehensive data structure for ride operations
 */
const rideSchema = new mongoose.Schema({
    // User who requested the ride
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    // Captain assigned to the ride
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    // Pickup location address
    pickup: {
        type: String,
        required: true,
    },
    // Destination address
    destination: {
        type: String,
        required: true,
    },
    // Calculated fare amount
    fare: {
        type: Number,
        required: true,
    },
    // Current ride status tracking
    status: {
        type: String,
        enum: ['pending', 'accepted', "ongoing", 'completed', 'cancelled'],
        default: 'pending',
    },
    // Trip duration in seconds
    duration: {
        type: Number,
    },
    // Trip distance in meters
    distance: {
        type: Number,
    },
    // Payment gateway transaction ID
    paymentID: {
        type: String,
    },
    // Payment order ID for tracking
    orderId: {
        type: String,
    },
    // Payment signature for verification
    signature: {
        type: String,
    },
    // Security OTP for ride verification (hidden by default)
    otp: {
        type: String,
        select: false, // Not included in queries by default for security
        required: true,
    },
});

module.exports = mongoose.model('ride', rideSchema);