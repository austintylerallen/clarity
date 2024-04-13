// authRoutes.js

const express = require('express');
const router = express.Router();
const Official = require('../models/Official');

// Login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect to dashboard on successful login
    failureRedirect: '/login',      // Redirect back to login page on failure
    failureFlash: true              // Enable flash messages for authentication failures
}));

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login'); // Redirect to login page after logout
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

        // Generate reset token and save it to the user record
        const resetToken = generateResetToken(); // Implement this function to generate a unique token
        user.resetToken = resetToken;
        await user.save();

        // Send password reset email
        await sendPasswordResetEmail(email, resetToken); // Implement this function to send the email

        // Redirect user to a confirmation page
        res.redirect('/reset-password');
    } catch (error) {
        console.error('Error requesting password reset:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Search officials route
router.get('/search', async (req, res) => {
    try {
        let officials;

        if (req.query.zipCode) {
            // Search by ZIP code
            const { zipCode } = req.query;
            officials = await Official.findByZipCode(zipCode);
        } else if (req.query.lat && req.query.lon) {
            // Search by geolocation coordinates
            const { lat, lon } = req.query;
            officials = await Official.findByCoordinates(lat, lon);
        } else {
            return res.status(400).json({ message: 'Invalid parameters.' });
        }

        res.json(officials);
    } catch (error) {
        console.error('Error searching for officials:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
