const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User'); // Ensure this is the correct path to your User model
const Politician = require('../models/Politician'); // Corrected model name from Official to Politician

// Login POST route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect to dashboard on successful login
    failureRedirect: '/auth/login', // Adjust redirect to reflect the route prefix
    failureFlash: true              // Enable flash messages for authentication failures
}));

// Login GET route to render the login page
router.get('/login', (req, res) => {
    res.render('login'); // Assumes 'login' is correctly set up in your views
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login'); // Adjust redirect to reflect the route prefix
});

// Forgot password route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Assume generateResetToken and sendPasswordResetEmail are defined elsewhere
        const resetToken = generateResetToken(); // This function needs to be implemented
        user.resetToken = resetToken;
        await user.save();

        // Send password reset email
        await sendPasswordResetEmail(email, resetToken); // This function needs to be implemented

        // Redirect user to a confirmation page
        res.redirect('/auth/reset-password'); // Adjust redirect to reflect the route prefix
    } catch (error) {
        console.error('Error requesting password reset:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Search politicians route
router.get('/search', async (req, res) => {
    try {
        let politicians;

        if (req.query.zipCode) {
            // Search by ZIP code
            const { zipCode } = req.query;
            politicians = await Politician.findByZipCode(zipCode);
        } else if (req.query.lat && req.query.lon) {
            // Search by geolocation coordinates
            const { lat, lon } = req.query;
            politicians = await Politician.findByCoordinates(lat, lon);
        } else {
            return res.status(400).json({ message: 'Invalid parameters.' });
        }

        res.json(politicians);
    } catch (error) {
        console.error('Error searching for politicians:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
