const user = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'incident_string';

const generateAuthToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}
exports.getLoggedInUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const userExists = await user.findById(userId).select('-password');
        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: 'Searched User not found'
            });
        }
        return res.status(200).json({
            success: true,
            user: userExists
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.registerUser = async (req, res) => {

    try {
        const { username, email, password, confirmPassword, roles } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            });
        }

        const userExists = await user.findOne({ $or: [{ email }, { username }] });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'Username or Email already registered'
            });
        }

        //create new

        const newUser = await user.create({ username, email, password, roles });

        //await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
            data: {
                user: newUser
            },
            status: 'success',
            success: true
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!password) {
            return res.status(400).json({
                success: false,
                message: 'password is missing, provide your credentials'
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email  is missing, provide your credentials'
            });
        }


        //await ==== > pause execution till DB finish searching
        const userExists = await user.findOne({ email: email.toLowerCase().trim() }).select('+password');

        if (!userExists) {
            return res.status(400).json({
                success: false,
                message: 'User does not exist. Please register first'
            });
        }
        const isMatch = await userExists.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = generateAuthToken(userExists);

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: userExists._id,
                username: userExists.username,
                email: userExists.email,
                roles: userExists.roles,
                createdAt: userExists.createdAt
            },
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}  