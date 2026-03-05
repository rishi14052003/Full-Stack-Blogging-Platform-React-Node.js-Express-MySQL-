const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controller/authController');

// Register user
router.post('/register', [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], authController.register);

// Login user
router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').exists().withMessage('Password is required')
], authController.login);

// Get user profile
router.get('/profile', authController.getProfile);

module.exports = router;