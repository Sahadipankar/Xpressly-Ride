const express = require('express');
const router = express.Router();  // Create a new router instance
const {body} = require('express-validator');  // Import express-validator for validation
const userController = require('../Controller/user.controller');  // Import the user controller


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),  // Validate email format
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),  // Validate first name length
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),  // Validate password length
], 
userController.userRegister);  // Route for user registration   





module.exports = router;  // Export the router for use in other files
// This router can be used to define routes related to user operations, such as registration, login, etc.
// The actual route handlers would be defined in the controller file and linked here.