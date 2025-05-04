const express = require('express');
const { register, login, logout, getProfile, updateProfile } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Logout route
router.get('/logout', logout);

// Get profile route - protected
router.get('/me', authenticate, getProfile);

// Update profile route - protected
router.put('/me', authenticate, updateProfile);

module.exports = router;
