const captainModel = require('../Models/captain.model'); // Import the captain model
const captainService = require('../Services/captain.service'); // Import the captain service
const { validationResult } = require('express-validator'); // Import express-validator for request validation
const blackListTokenModel = require('../Models/blacklistToken.model'); // Import the blacklist token model



module.exports.registerCaptain = async (req, res, next) => { // Function to register a new captain

    const errors = validationResult(req); // Validate the request body using express-validator

    if (!errors.isEmpty()) { // Check if there are validation errors
        return res.status(400).json({ // Return a 400 Bad Request response with the validation errors
            errors: errors.array(), // Send the array of validation errors
        });
    }

    const { fullname, email, password, vehicle } = req.body; // Destructure the request body to get the captain's details

    const isCaptainAlreadyExist = await captainModel.findOne({ email }); // Check if a captain with the same email already exists

    if (isCaptainAlreadyExist) { // If a captain with the same email exists
        return res.status(400).json({ // Return a 400 Bad Request response
            message: 'Captain already exists', // Send an error message
        });
    }

    const hashedPassword = await captainModel.hashPassword(password); // Hash the password using the hashPassword method from the captain model

    const captain = await captainService.createCaptain({ // Call the createCaptain function from the captain service to create a new captain
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    }); 

    const token = captain.generateAuthToken(); // Generate a JWT token for the newly created captain

    res.status(201).json({ token, captain }); // Return a 201 Created response with the token and captain details

}



module.exports.loginCaptain = async (req, res, next) => { // Function to log in a captain

    const errors = validationResult(req); // Validate the request body using express-validator

    if (!errors.isEmpty()) { // Check if there are validation errors
        return res.status(400).json({ // Return a 400 Bad Request response with the validation errors
            errors: errors.array(), // Send the array of validation errors
        });
    }

    const { email, password } = req.body; // Destructure the request body to get the email and password

    const captain = await captainModel.findOne({ email }).select('+password'); // Find the captain by email and select the password field

    if (!captain) { // If the captain is not found
        return res.status(400).json({ // Return a 400 Bad Request response
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