const captainModel = require('../Models/captain.model'); // Import the captain model
const captainService = require('../Services/captain.service'); // Import the captain service
const { validationResult } = require('express-validator'); // Import express-validator for request validation




module.exports.registerCatain = async (req, res) => { // Function to register a new captain

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