const captainModel = require('../Models/captain.model');
const captainService = require('../Services/captain.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../Models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({
            message: 'Captain already exists',
        });
    }

    const hashedPassword = await captainModel.hashPassword(password);

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

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(400).json({
            message: 'Invalid email or password', // Send an error message
        });
    }

    const isMatch = await captain.comparePassword(password); // Compare the provided password with the hashed password

    if (!isMatch) { // If the passwords do not match
        return res.status(400).json({ // Return a 400 Bad Request response
            message: 'Invalid email or password', // Send an error message
        });
    }

    const token = captain.generateAuthToken(); // Generate a JWT token for the logged-in captain

    res.cookie('token', token,) // Set the token as a cookie in the response

    res.status(200).json({ // Return a 200 OK response
        token, // Send the token in the response
        captain, // Send the captain details in the response
    });
}



module.exports.getCaptainProfile = async (req, res, next) => { // Function to get the captain's profile

    res.status(200).json({ // Return a 200 OK response
        captain: req.captain, // Send the captain details from the request object
    });
}



module.exports.logoutCaptain = async (req, res, next) => { // Function to log out a captain

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Get the token from cookies or headers

    await blackListTokenModel.create({ token: token }); // Add the token to the blacklist in the database

    res.clearCookie('token'); // Clear the token cookie from the response

    res.status(200).json({ // Return a 200 OK response
        message: 'Logged out successfully', // Send a success message
    });
}