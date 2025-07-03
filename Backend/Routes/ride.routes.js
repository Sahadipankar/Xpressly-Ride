/**
 * Ride Routes
 * 
 * API endpoint definitions for ride management operations including
 * ride creation, fare calculation, confirmation, start, and completion.
 * Implements role-based authentication and comprehensive validation.
 */

const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../Controllers/ride.controller');
const authMiddleware = require('../Middlewares/auth.middleware');

/**
 * POST /create - Create new ride request
 * Protected route for authenticated users to book rides
 * Validates pickup/destination addresses and vehicle type selection
 */
router.post('/create',
    authMiddleware.authUser, // Ensure user is authenticated
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['Auto', 'Car', 'Moto']).withMessage('Invalid vehicle type'),
    rideController.createRide
)

/**
 * GET /get-fare - Calculate fare for route
 * Protected route for users to get fare estimates before booking
 * Validates pickup and destination parameters for accurate pricing
 */
router.get('/get-fare',
    authMiddleware.authUser, // User authentication required
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    rideController.getFare
)

/**
 * POST /confirm - Captain confirms ride request
 * Protected route for captains to accept ride requests
 * Validates ride ID and updates ride status to accepted
 */
router.post('/confirm',
    authMiddleware.authCaptain, // Captain authentication required
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)

/**
 * GET /start-ride - Start ride journey
 * Protected route for captains to begin ride after OTP verification
 * Validates ride ID and OTP for security and ride tracking
 */
router.get('/start-ride',
    authMiddleware.authCaptain, // Captain authentication required
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)

/**
 * POST /end-ride - Complete ride journey
 * Protected route for captains to finish rides at destination
 * Validates ride ID and updates final ride status
 */
router.post('/end-ride',
    authMiddleware.authCaptain, // Captain authentication required
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)

module.exports = router;