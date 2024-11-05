const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const User = require('../models/userModel'); // Adjust the path based on your structure

// POST /api/register - Register a new user
router.post('/register', asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields!' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists with this email!' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    // Respond with the user's information, excluding the password
    res.status(201).json({
        message: 'User registered successfully!',
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    });
}));

// GET /api/users - Get all registered users (for testing purposes)
router.get('/users', asyncHandler(async (req, res) => {
    const users = await User.find({}, '-password'); // Exclude password from the result
    res.status(200).json(users);
}));

module.exports = router;