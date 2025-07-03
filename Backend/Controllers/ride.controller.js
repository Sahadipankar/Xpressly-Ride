/**
 * Ride Controller
 * 
 * Manages the complete ride lifecycle including creation, fare calculation,
 * confirmation, start, and completion. Handles real-time communication between
 * users and captains through WebSocket events for seamless ride experience.
 */

const rideService = require('../Services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../Services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../Models/ride.model');

/**
 * Create a new ride request
 * Initiates ride booking process and notifies nearby captains
 * @param {Object} req - Express request object with ride details
 * @param {Object} res - Express response object
 */
module.exports.createRide = async (req, res) => {
    // Validate incoming ride request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        // Create new ride record in database
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        // Get pickup location coordinates for captain search
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

        // Find captains within 5km radius of pickup location
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 5);

        // Hide OTP from ride data sent to captains for security
        ride.otp = ""
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        // Notify all nearby captains about new ride request
        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

/**
 * Calculate fare for a ride
 * Computes pricing based on distance and vehicle type
 * @param {Object} req - Express request object with pickup and destination
 * @param {Object} res - Express response object
 */
module.exports.getFare = async (req, res) => {
    // Validate fare calculation parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        // Calculate fare based on distance and vehicle type
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

/**
 * Confirm ride by captain
 * Captain accepts ride request and user is notified
 * @param {Object} req - Express request object with ride ID
 * @param {Object} res - Express response object
 */
module.exports.confirmRide = async (req, res) => {
    // Validate ride confirmation data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        // Captain confirms and accepts the ride
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        // Notify user that ride has been confirmed
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

/**
 * Start ride journey
 * Captain starts the ride after verifying OTP from user
 * @param {Object} req - Express request object with ride ID and OTP
 * @param {Object} res - Express response object
 */
module.exports.startRide = async (req, res) => {
    // Validate ride start parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        // Start ride after OTP verification
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        // Notify user that ride has started
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

/**
 * End ride journey
 * Captain completes the ride at destination
 * @param {Object} req - Express request object with ride ID
 * @param {Object} res - Express response object
 */
module.exports.endRide = async (req, res) => {
    // Validate ride completion data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        // Complete the ride and update status
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        // Notify user that ride has ended
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
