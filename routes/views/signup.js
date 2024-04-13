const express = require('express');
const router = express.Router();
const { hashPassword } = require('../utils/passwordUtils');


const plainPassword = 'password123';
const hashedPassword = hashPassword(plainPassword);

console.log(hashedPassword); // Output the hashed password


// Define route handler for the signup page
router.get('/', (req, res) => {
    res.render('signup'); // Render the signup view file
});

// Define route handler to handle form submission for signup
router.post('/', (req, res) => {
    // Extract form data from request body
    const { username, email, password } = req.body;

    // Process the form data (e.g., store it in the database)
    // This is where you would typically interact with your database to save the user information

    // Redirect the user to a different page after signup (e.g., home page)
    res.redirect('/');
});



module.exports = router;
