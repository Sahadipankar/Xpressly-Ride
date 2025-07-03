/**
 * Captain Service
 * 
 * Business logic layer for captain operations.
 * Handles captain creation with validation and data processing.
 * Manages captain entity lifecycle and business rules.
 */

const captainModel = require('../Models/captain.model');

/**
 * Create a new captain account
 * Validates required fields and creates captain with vehicle information
 * @param {Object} captainData - Captain registration data
 * @param {string} captainData.firstname - Captain's first name
 * @param {string} captainData.lastname - Captain's last name
 * @param {string} captainData.email - Captain's email address
 * @param {string} captainData.password - Hashed password
 * @param {string} captainData.color - Vehicle color
 * @param {string} captainData.plate - Vehicle plate number
 * @param {number} captainData.capacity - Vehicle passenger capacity
 * @param {string} captainData.vehicleType - Type of vehicle (Car/Moto/Auto)
 * @returns {Object} Created captain instance
 */
module.exports.createCaptain = async ({     // Function to create a new captain
    firstname, lastname, email, password,
    color, plate, capacity, vehicleType
}) => {
    // Validate all required fields are provided
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required'); // Check if all required fields are provided
    }

    // Create captain record with structured data
    const captain = captainModel.create({ // Create a new captain instance
        fullname: { firstname, lastname }, // Set the captain's name
        email, // Set the captain's email
        password, // Set the captain's password
        vehicle: { color, plate, capacity, vehicleType }, // Set the vehicle details
    });

    return captain; // Return the created captain instance
}