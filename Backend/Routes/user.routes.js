const express = require('express');
const router = express.Router();  // Create a new router instance
const {body} = require('express-validator');  // Import express-validator for validation
const userController = require('../Controllers/user.controller');  // Import the user controller
const authMiddleware = require('../Middlewares/auth.middleware');  // Import the authentication middleware



router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),  // Validate email format
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),  // Validate first name length
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),  // Validate password length
], 
userController.registerUser);  // Route for user registration   



router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),  // Validate email format
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),  // Validate password length
],
userController.loginUser);  // Route for user login



router.get('/profile', authMiddleware.authUser, userController.getUserProfile);  // Route for getting user profile



router.get('/logout', authMiddleware.authUser, userController.logoutUser);  // Route for user logout

module.exports = router;  // Export the router for use in other files
// This router can be used to define routes related to user operations, such as registration, login, etc.
// The actual route handlers would be defined in the controller file and linked here.