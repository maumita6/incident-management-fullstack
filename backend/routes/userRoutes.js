const express = require('express');
const router = express.Router();
const user = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { registerUser, loginUser, getLoggedInUser } = require('../controllers/userController');

// Register a new user
router.post('/register', registerUser);

//login user
router.post('/login', loginUser);

// Get logged-in user
router.get('/me', getLoggedInUser);

module.exports = router;
