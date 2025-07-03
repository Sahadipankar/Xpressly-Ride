/**
 * Ride Service
 * 
 * Business logic layer for ride operations including fare calculation,
 * ride lifecycle management, and OTP generation for security.
 * Handles complex fare calculations with dynamic pricing and surge factors.
 */

const rideModel = require('../Models/ride.model');
const mapService = require('./maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

/**
 * Calculate fare for different vehicle types based on distance and time
 * Implements dynamic pricing with surge factors and minimum fare guarantees
 * @param {string} pickup - Pickup location address
 * @param {string} destination - Destination address
 * @returns {Object} Comprehensive fare structure for all vehicle types
 */
async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    // Get distance and time data from maps service
    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    // Base fare structure for Indian market pricing
    const baseFare = {
        Car: 50,    // Premium comfort rides
        Auto: 25,   // Standard auto-rickshaw rides
        Moto: 15    // Quick motorcycle rides
    };

    // Per kilometer pricing rates
    const perKmRate = {
        Car: 12,    // Higher rate for cars
        Auto: 10,   // Moderate rate for autos
        Moto: 6     // Economical rate for motorcycles
    };

    // Time-based charging per minute
    const perMinuteRate = {
        Car: 2.5,   // Premium time rate
        Auto: 2,    // Standard time rate
        Moto: 1.5   // Budget time rate
    };

    // Dynamic surge pricing factors (adjustable based on demand)
    const surgePricing = {
        Car: 1.0,   // No surge by default
        Auto: 1.0,
        Moto: 1.0
    };

    // Convert distance and time to appropriate units
    const distanceKm = distanceTime.distance.value / 1000;
    const durationMinutes = distanceTime.duration.value / 60;

    /**
     * Calculate fare for specific vehicle type
     * @param {string} vehicleType - Type of vehicle (Car/Auto/Moto)
     * @returns {number} Final fare amount
     */
    const calculateVehicleFare = (vehicleType) => {
        const base = baseFare[vehicleType];
        const distanceFare = distanceKm * perKmRate[vehicleType];
        const timeFare = durationMinutes * perMinuteRate[vehicleType];
        const surgeFactor = surgePricing[vehicleType];

        // Calculate base total before surge
        const baseTotalFare = base + distanceFare + timeFare;

        // Apply dynamic surge pricing
        const fareWithSurge = baseTotalFare * surgeFactor;

        // Minimum fare guarantees for service quality
        const minimumFare = {
            Car: 80,   // Minimum viable fare for cars
            Auto: 40,  // Minimum fare for autos
            Moto: 25   // Minimum fare for motorcycles
        };

        return Math.max(Math.round(fareWithSurge), minimumFare[vehicleType]);
    };

    // Generate comprehensive fare structure
    const fare = {
        Auto: calculateVehicleFare('Auto'),
        Car: calculateVehicleFare('Car'),
        Moto: calculateVehicleFare('Moto'),
        // Trip details for transparency
        distance: {
            value: distanceTime.distance.value,
            text: distanceTime.distance.text
        },
        duration: {
            value: distanceTime.duration.value,
            text: distanceTime.duration.text
        },
        // Detailed fare breakdown for user understanding
        breakdown: {
            Auto: {
                baseFare: baseFare.Auto,
                distanceFare: Math.round(distanceKm * perKmRate.Auto),
                timeFare: Math.round(durationMinutes * perMinuteRate.Auto),
                surgeFactor: surgePricing.Auto
            },
            Car: {
                baseFare: baseFare.Car,
                distanceFare: Math.round(distanceKm * perKmRate.Car),
                timeFare: Math.round(durationMinutes * perMinuteRate.Car),
                surgeFactor: surgePricing.Car
            },
            Moto: {
                baseFare: baseFare.Moto,
                distanceFare: Math.round(distanceKm * perKmRate.Moto),
                timeFare: Math.round(durationMinutes * perMinuteRate.Moto),
                surgeFactor: surgePricing.Moto
            }
        }
    };

    return fare;
}

module.exports.getFare = getFare;

/**
 * Generate secure OTP for ride verification
 * Creates cryptographically secure random number
 * @param {number} num - Number of digits for OTP
 * @returns {string} Generated OTP string
 */
function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

/**
 * Create a new ride request
 * Generates ride record with fare calculation and OTP
 * @param {Object} rideData - Ride creation data
 * @param {string} rideData.user - User ID requesting the ride
 * @param {string} rideData.pickup - Pickup location
 * @param {string} rideData.destination - Destination location
 * @param {string} rideData.vehicleType - Selected vehicle type
 * @returns {Object} Created ride object
 */
module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    // Calculate fare for the selected route
    const fare = await getFare(pickup, destination);

    // Create ride record with all necessary data
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6), // 6-digit security OTP
        fare: fare[vehicleType] // Fare for selected vehicle type
    })

    return ride;
}

/**
 * Confirm ride by captain
 * Updates ride status and assigns captain
 * @param {Object} confirmData - Ride confirmation data
 * @param {string} confirmData.rideId - ID of ride to confirm
 * @param {Object} confirmData.captain - Captain accepting the ride
 * @returns {Object} Updated ride with captain and user data
 */
module.exports.confirmRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    // Update ride status to accepted and assign captain
    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    // Retrieve complete ride data with populated references
    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }
    return ride;
}

/**
 * Start ride journey after OTP verification
 * Validates OTP and updates ride status to ongoing
 * @param {Object} startData - Ride start data
 * @param {string} startData.rideId - ID of ride to start
 * @param {string} startData.otp - OTP for verification
 * @param {Object} startData.captain - Captain starting the ride
 * @returns {Object} Updated ride object
 */
module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    // Find ride with complete data including OTP
    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    // Verify OTP for security
    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    // Update ride status to ongoing
    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

/**
 * End ride journey
 * Completes the ride and updates status
 * @param {Object} endData - Ride completion data
 * @param {string} endData.rideId - ID of ride to end
 * @param {Object} endData.captain - Captain ending the ride
 * @returns {Object} Completed ride object
 */
module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    // Find ride assigned to specific captain
    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    // Mark ride as completed
    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}