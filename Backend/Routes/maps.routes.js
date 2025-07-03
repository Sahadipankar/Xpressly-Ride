/**
 * Maps Routes
 * 
 * API routes for location and mapping services using Google Maps API.
 * Handles coordinate conversion, distance calculations, address suggestions,
 * and reverse geocoding with authentication middleware protection.
 */

const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/auth.middleware');
const mapController = require('../Controllers/maps.controller');
const { query } = require('express-validator');

// Get coordinates from address string (geocoding)
router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }), // Validate address parameter
    authMiddleware.authUser, // Require user authentication
    mapController.getCoordinates
);

// Calculate distance and travel time between two points
router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }), // Validate origin address
    query('destination').isString().isLength({ min: 3 }), // Validate destination address
    authMiddleware.authUser, // Require user authentication
    mapController.getDistanceTime
)

// Get autocomplete suggestions for address input
router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }), // Validate search input
    authMiddleware.authUser, // Require user authentication
    mapController.getAutoCompleteSuggestions
)

// Get address from coordinates (reverse geocoding)
router.get('/get-address',
    query('lat').isFloat(), // Validate latitude coordinate
    query('lng').isFloat(), // Validate longitude coordinate
    authMiddleware.authUser, // Require user authentication
    mapController.getAddressFromCoordinates
);

module.exports = router;