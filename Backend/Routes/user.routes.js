/**
 * User Routes
 * 
 * API endpoint definitions for user-related operations including
 * registration, authentication, profile management, and session handling.
 * Implements validation middleware and authentication protection.
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../Controllers/user.controller');
const authMiddleware = require('../Middlewares/auth.middleware');

/**
 * POST /register - User registration endpoint
 * Creates new user account with validation
 * Validates email format, name length, and password strength
 */
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
    userController.registerUser);

/**
 * POST /login - User authentication endpoint
 * Validates credentials and provides access token
 * Requires valid email format and minimum password length
 */
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
    userController.loginUser);

/**
 * GET /profile - Get user profile information
 * Protected route requiring valid authentication token
 * Returns current user's profile data
 */
router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

/**
 * GET /logout - User logout endpoint
 * Protected route that invalidates current session
 * Adds token to blacklist and clears session cookies
 */
router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;