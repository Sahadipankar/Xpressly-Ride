// User Controller - handles user authentication and account management
const userModel = require('../Models/user.model');
const userService = require('../Services/user.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../Models/blacklistToken.model');

/**
 * Register new user account
 * @param {Object} req - Express request object containing user registration data
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.registerUser = async (req, res, next) => {
    // Validate request data using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract user data from request body
    const { fullname, email, password } = req.body;

    // Check if user already exists with this email
    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password for security before storing
    const hashedPassword = await userModel.hashPassword(password);

    // Create new user using service layer
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
    });

    // Generate JWT token for authentication
    const token = user.generateAuthToken();

    // Return success response with token and user data
    res.status(201).json({ token, user });  // Return a 201 status with the token and user data
}



module.exports.loginUser = async (req, res, next) => {  // Function to handle user login

    const errors = validationResult(req);  // Validate the request
    if (!errors.isEmpty()) {  // If there are validation errors
        return res.status(400).json({ errors: errors.array() });  // Return a 400 status with the errors
    }

    const { email, password } = req.body;  // Destructure the request body

    const user = await userModel.findOne({ email }).select('+password');  // Find the user by email and include the password in the result

    if (!user) {  // If the user is not found
        return res.status(401).json({ message: 'Invalid email or password' });  // Return a 401 status with an error message
    }

    const isMatch = await user.comparePassword(password);  // Compare the provided password with the stored hashed password

    if (!isMatch) {  // If the passwords do not match
        return res.status(401).json({ message: 'Invalid email or password' });  // Return a 401 status with an error message
    }

    const token = user.generateAuthToken();  // Generate a JWT token for the user

    res.cookie('token', token);  // Set the token as a cookie in the response

    res.status(200).json({ message: 'Logged in successfully', token, user });  // Return a 200 status with a success message, token, and user data
}



module.exports.getUserProfile = async (req, res, next) => {  // Function to get user profile
    res.status(200).json(req.user);  // Return a 200 status with the user data from the request object
}



module.exports.logoutUser = async (req, res, next) => {  // Function to handle user logout
    res.clearCookie('token');  // Clear the token cookie from the response

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];  // Get the token from cookies or headers

    await blackListTokenModel.create({ token });  // Add the token to the blacklist
    // This will prevent the token from being used again

    res.status(200).json({ message: 'Logged out successfully' });  // Return a 200 status with a success message
}


