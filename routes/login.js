const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to handle user login via POST request
router.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user in the database based on the provided username
        const user = await User.findOne({ where: { username } });

        if (!user) {
            // User not found
            console.log('User not found.');
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if the provided password matches the user's password
        const isPasswordValid = await user.isValidPassword(password);

        if (!isPasswordValid) {
            // Invalid password
            console.log('Invalid password.');
            return res.status(401).json({ message: 'Invalid password.' });
        }

        // Password is valid, login successful
        console.log('Login successful.');
        
        // Redirect to the dashboard
        return res.redirect('/dashboard');
    } catch (error) {
        // Error handling
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
