const userModel = require('../Models/user.model');  // Import the user model
const userService = require('../Services/user.service');  // Import the user service
const { validationResult } = require('express-validator');  // Import express-validator for validation

module.exports.userRegister = async (req, res, next) => {  // Function to handle user registration
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