const express = require('express');
const router = express.Router();

// Define route handler for the signup page
router.get('/', (req, res) => {
    res.render('signup'); // Render the signup view file
});

// Define route handler to handle form submission for signup
router.post('/', (req, res) => {
    // Extract form data from request body
    const { username, email, password } = req.body;

    // Process the form data (e.g., validate inputs, store user information in database)
    // Your code for saving user data goes here...

    // Redirect the user to a different page after signup (e.g., home page)
    res.redirect('/');
});

module.exports = router;
