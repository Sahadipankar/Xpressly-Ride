const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../Controllers/captain.controller');
const authMiddleware = require('../Middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Please fill a valid email address'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['Car', 'Auto', 'Moto']).withMessage('Vehicle type must be either Car, Auto, or Moto')
],
    captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Please fill a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    captainController.loginCaptain); // Call the loginCaptain function from the controller



router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile); // Define a GET route to fetch the captain's profile



router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain); // Define a GET route for user logout



module.exports = router; // Export the router for use in other files
// Import the necessary modules and models