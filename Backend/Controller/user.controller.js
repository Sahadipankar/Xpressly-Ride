const userModel = require('../Models/user.model');  // Import the user model
const userService = require('../Services/user.service');  // Import the user service
const { validationResult } = require('express-validator');  // Import express-validator for validation


module.exports.registerUser = async (req, res, next) => {  // Function to handle user registration
    const errors = validationResult(req);  // Validate the request
    if (!errors.isEmpty()) {  // If there are validation errors
        return res.status(400).json({ errors: errors.array() });  // Return a 400 status with the errors
    }
    const { fullname, email, password } = req.body;  // Destructure the request body

    const hashedPassword = await userModel.hashPassword(password);  // Hash the password

    const user = await userService.createUser({  // Create a new user using the service
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,  // Use the hashed password
    });

    const token = user.generateAuthToken();  // Generate a JWT token for the user

    res.status(201).json({token, user});  // Return a 201 status with the token and user data
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

    res.status(200).json({token, user});  // Return a 200 status with the token and user data
}
