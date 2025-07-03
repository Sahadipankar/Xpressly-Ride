/**
 * User Service
 * 
 * Business logic layer for user operations.
 * Handles user creation with validation and data processing.
 * Manages user entity lifecycle and business rules.
 */

const userModel = require('../Models/user.model');

/**
 * Create a new user account
 * Validates required fields and creates user with structured name data
 * @param {Object} userData - User registration data
 * @param {string} userData.firstname - User's first name
 * @param {string} userData.lastname - User's last name (optional)
 * @param {string} userData.email - User's email address (unique identifier)
 * @param {string} userData.password - Hashed password for authentication
 * @returns {Object} Created user instance
 */
module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    // Validate required fields for user creation
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }

    // Create user record with structured data
    const user = userModel.create({
        fullname: { firstname, lastname }, // Structured name object
        email, // Unique email identifier
        password // Pre-hashed password for security
    });

    return user; // Return created user instance
}