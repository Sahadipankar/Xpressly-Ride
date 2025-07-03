/**
 * Maps Controller
 * 
 * Handles all location and mapping related operations including geocoding,
 * distance calculations, autocomplete suggestions, and reverse geocoding.
 * Integrates with Google Maps API for comprehensive location services.
 */

const mapService = require('../Services/maps.service');
const { validationResult } = require('express-validator');

/**
 * Get coordinates from address
 * Converts physical address to latitude/longitude coordinates
 * @param {Object} req - Express request object with address query parameter
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.getCoordinates = async (req, res, next) => {
    // Validate incoming request parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        // Convert address to coordinates using geocoding service
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
}

/**
 * Calculate distance and travel time between two locations
 * Provides routing information for ride fare and ETA calculations
 * @param {Object} req - Express request object with origin and destination
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.getDistanceTime = async (req, res, next) => {
    try {
        // Validate request parameters
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;

        // Calculate distance and time using routing service
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * Get location autocomplete suggestions
 * Provides real-time search suggestions for location input
 * @param {Object} req - Express request object with input query parameter
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    try {
        // Validate input parameters
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        // Get location suggestions from places API
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * Get address from coordinates (reverse geocoding)
 * Converts latitude/longitude coordinates to readable address
 * @param {Object} req - Express request object with lat/lng parameters
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.getAddressFromCoordinates = async (req, res, next) => {
    // Validate coordinate parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { lat, lng } = req.query;

    try {
        // Convert coordinates to human-readable address
        const addressData = await mapService.getAddressFromCoordinates(lat, lng);
        res.status(200).json(addressData);
    } catch (error) {
        res.status(404).json({ message: 'Address not found' });
    }
}
