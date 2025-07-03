/**
 * Captain Controller
 * 
 * Handles all captain/driver related operations including registration,
 * authentication, profile management, and session handling.
 * Manages captain account lifecycle and security operations.
 */

const captainModel = require('../Models/captain.model');
const captainService = require('../Services/captain.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../Models/blacklistToken.model');

/**
 * Register a new captain/driver
 * Creates captain account with personal and vehicle information
 * @param {Object} req - Express request object containing captain data
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.registerCaptain = async (req, res, next) => {
    // Validate incoming request data
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { fullname, email, password, vehicle } = req.body;

    // Check if captain already exists with this email
    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({
            message: 'Captain already exists',
        });
    }

    // Hash password for security
    const hashedPassword = await captainModel.hashPassword(password);

    // Create new captain with complete profile data
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    // Generate authentication token for immediate login
    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
}

/**
 * Authenticate captain login
 * Validates credentials and provides access token
 * @param {Object} req - Express request object with login credentials
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.loginCaptain = async (req, res, next) => {
    // Validate incoming request data
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { email, password } = req.body;

    // Find captain by email and include password for verification
    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(400).json({
            message: 'Invalid email or password',
        });
    }

    // Verify password against stored hash
    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(400).json({
            message: 'Invalid email or password',
        });
    }

    // Generate new session token
    const token = captain.generateAuthToken();

    // Set secure session cookie
    res.cookie('token', token,)

    res.status(200).json({
        token,
        captain,
    });
}

/**
 * Get captain profile information
 * Returns current captain's profile data from authenticated session
 * @param {Object} req - Express request object with captain data
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({
        captain: req.captain, // Captain data added by auth middleware
    });
}

/**
 * Logout captain and invalidate session
 * Adds token to blacklist and clears session cookies
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.logoutCaptain = async (req, res, next) => {
    // Extract token from cookies or authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    // Add token to blacklist to prevent reuse
    await blackListTokenModel.create({ token: token });

    // Clear session cookie
    res.clearCookie('token');

    res.status(200).json({
        message: 'Logged out successfully',
    });
}