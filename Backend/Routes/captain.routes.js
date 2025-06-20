const express = require('express');             // Import Express framework
const router = express.Router();                // Create a new router instance
const { body } = require('express-validator');  // Import express-validator for request validation
const captainController = require('../Controller/captain.controller'); // Import the captain controller
const authMiddleware = require('../Middlewares/auth.middleware'); // Import authentication middleware



router.post('/register', [ // Define a POST route for user registration
    body('email').isEmail().withMessage('Please fill a valid email address'), // Validate email format

    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'), // Validate first name length

    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), // Validate password length

    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'), // Validate vehicle color length

    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'), // Validate vehicle plate length

    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'), // Validate vehicle capacity

    body('vehicle.vehicleType').isIn(['Car', 'Auto', 'Moto']).withMessage('Vehicle type must be either Car, Auto, or Moto') // Validate vehicle type
],
    captainController.registerCaptain); // Call the registerCaptain function from the controller



router.post('/login', [ // Define a POST route for user login
    body('email').isEmail().withMessage('Please fill a valid email address'), // Validate email format
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long') // Validate password length
],
    captainController.loginCaptain); // Call the loginCaptain function from the controller



router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile); // Define a GET route to fetch the captain's profile



router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain); // Define a GET route for user logout



module.exports = router; // Export the router for use in other files
// Import the necessary modules and models