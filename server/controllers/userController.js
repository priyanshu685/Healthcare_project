const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../modules/userModel");
require("dotenv").config();

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber, age, bloodGroup, gender } = req.body;

    // Check if all fields are provided
    if (!firstName || !lastName || !email || !password || !phoneNumber || !age || !bloodGroup || !gender) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const newUser = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        age,
        bloodGroup,
        gender,
        password: hashedPassword,
    });

    // Send success response
    res.status(201).json({ message: "User registered successfully", newUser });
});

// User login
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide both email and password");
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists and the password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            message: "Login successful!",
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

module.exports = { registerUser, userLogin };