const userModel = require('../Models/user.model');  // Import the user model
const bcrypt = require('bcrypt');  // Import bcrypt for password hashing
const jwt = require('jsonwebtoken');  // Import jsonwebtoken for token generation
const captainModel = require('../Models/captain.model');  // Import the captain model
const blackListTokenModel = require('../Models/blacklistToken.model');  // Import the blacklist token model

module.exports.authUser = async (req, res, next) => {  // Middleware to authenticate user
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];  // Get the token from cookies or headers

    if (!token) {  // If no token is provided
        return res.status(401).json({ message: 'Unauthorized' });  // Return a 401 status with an error message
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });  // Check if the token is blacklisted in the database

    if (isBlacklisted) {  // If the token is blacklisted
        return res.status(401).json({ message: 'Unauthorized' });  // Return a 401 status with an error message
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token using the secret key
        const user = await userModel.findById(decoded._id);  // Find the user by ID from the decoded token

        req.user = user;  // Attach the user to the request object

        return next();  // Call the next middleware or route handler
    }
    
    catch (err) {  // If there is an error during verification
        return res.status(401).json({ message: 'Unauthorized' });  // Return a 401 status with an error message
    }
}


module.exports.authCaptain = async (req, res, next) => {  // Middleware to authenticate captain
    
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];  // Get the token from cookies or headers

    if (!token) {  // If no token is provided
        return res.status(401).json({ message: 'Unauthorized' });  // Return a 401 status with an error message
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });  // Check if the token is blacklisted in the database

    if (isBlacklisted) {  // If the token is blacklisted
        return res.status(401).json({ message: 'Unauthorized' });  // Return a 401 status with an error message
    }

    try {   
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token using the secret key
        const captain = await captainModel.findById(decoded._id);  // Find the captain by ID from the decoded token

        req.captain = captain;  // Attach the captain to the request object

        return next();  // Call the next middleware or route handler
    }
    
    catch (err) {  // If there is an error during verification
        return res.status(401).json({ message: 'Unauthorized' });  // Return a 401 status with an error message
    }
}


