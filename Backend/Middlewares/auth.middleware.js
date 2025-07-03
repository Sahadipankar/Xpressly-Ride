/**
 * Authentication Middleware
 * 
 * Provides authentication and authorization middleware for protecting routes.
 * Handles JWT token verification, blacklist checking, and user/captain validation.
 * Ensures secure access to protected endpoints with role-based authentication.
 */

const userModel = require('../Models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainModel = require('../Models/captain.model');
const blackListTokenModel = require('../Models/blacklistToken.model');

/**
 * User authentication middleware
 * Verifies JWT token and validates user access to protected routes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.authUser = async (req, res, next) => {
    // Extract token from cookies or authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if token is blacklisted (logged out/invalidated)
    const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify JWT token and decode payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID from token payload
        const user = await userModel.findById(decoded._id);

        // Attach authenticated user to request object
        req.user = user;

        return next(); // Proceed to next middleware/route handler
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

/**
 * Captain authentication middleware
 * Verifies JWT token and validates captain access to protected routes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.authCaptain = async (req, res, next) => {
    // Extract token from cookies or authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if token is blacklisted (logged out/invalidated)
    const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify JWT token and decode payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find captain by ID from token payload
        const captain = await captainModel.findById(decoded._id);

        // Attach authenticated captain to request object
        req.captain = captain;

        return next(); // Proceed to next middleware/route handler
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}


