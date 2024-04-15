const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path as necessary
const bcrypt = require('bcrypt');

// Define route handler for the signup page
router.get('/', (req, res) => {
    res.render('signup'); // Render the signup view file
});

// Define route handler to handle form submission for signup
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Validate input data (add more validation as necessary)
        if (!username || !email || !password) {
            throw new Error('All fields are required');
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists with the given email');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in the database
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Redirect the user to the login page or anywhere you deem necessary
        res.redirect('/login');
    } catch (error) {
        console.error('Signup Error:', error.message);
        // Render the signup page again with an error message
        res.render('signup', { error: error.message });
    }
});

module.exports = router;
