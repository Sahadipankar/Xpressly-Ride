/**
 * Captain Routes
 * 
 * API endpoint definitions for captain/driver operations including
 * registration, authentication, profile management, and session handling.
 * Implements comprehensive validation for vehicle information and driver credentials.
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../Controllers/captain.controller');
const authMiddleware = require('../Middlewares/auth.middleware');

/**
 * POST /register - Captain registration endpoint
 * Creates new captain account with complete profile and vehicle validation
 * Validates personal information and vehicle details for driver onboarding
 */
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

/**
 * POST /login - Captain authentication endpoint
 * Validates captain credentials and provides access to captain dashboard
 * Requires valid email format and secure password
 */
router.post('/login', [
    body('email').isEmail().withMessage('Please fill a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    captainController.loginCaptain);

/**
 * GET /profile - Get captain profile information
 * Protected route requiring valid captain authentication token
 * Returns current captain's profile and vehicle data
 */
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

/**
 * GET /logout - Captain logout endpoint
 * Protected route that invalidates current captain session
 * Adds token to blacklist and clears session cookies
 */
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;