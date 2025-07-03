/**
 * Maps Service
 * 
 * Business logic layer for location-based operations.
 * Integrates with Google Maps API for geocoding, routing, and place services.
 * Handles geospatial queries for captain-user matching and location processing.
 */

const axios = require('axios');
const captainModel = require('../Models/captain.model');

/**
 * Convert address to coordinates using Google Geocoding API
 * @param {string} address - Physical address to convert
 * @returns {Object} Coordinates object with latitude and longitude
 */
module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        throw error;
    }
}

/**
 * Calculate distance and travel time between two locations
 * Uses Google Distance Matrix API for accurate routing data
 * @param {string} origin - Starting location address
 * @param {string} destination - Destination address
 * @returns {Object} Distance and duration information
 */
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (err) {
        throw err;
    }
}

/**
 * Get autocomplete suggestions for location search
 * Provides real-time place suggestions using Google Places API
 * @param {string} input - Partial location text input
 * @returns {Array} Array of suggested place descriptions
 */
module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        throw err;
    }
}

/**
 * Find captains within specified radius of a location
 * Uses MongoDB geospatial queries for efficient captain-user matching
 * @param {number} ltd - Latitude of center point
 * @param {number} lng - Longitude of center point
 * @param {number} radius - Search radius in kilometers
 * @returns {Array} Array of captain objects within radius
 */
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    // Find captains using geospatial query with spherical calculations
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371] // Earth radius in km
            }
        }
    });
    return captains;
}

/**
 * Convert coordinates to address using reverse geocoding
 * @param {number} lat - Latitude coordinate
 * @param {number} lng - Longitude coordinate
 * @returns {Object} Address information with formatted address and components
 */
module.exports.getAddressFromCoordinates = async (lat, lng) => {
    if (!lat || !lng) {
        throw new Error('Latitude and longitude are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK' && response.data.results.length > 0) {
            return {
                address: response.data.results[0].formatted_address,
                components: response.data.results[0].address_components
            };
        } else {
            throw new Error('Unable to fetch address');
        }
    } catch (error) {
        throw error;
    }
}