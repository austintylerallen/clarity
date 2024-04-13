// login.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { hashPassword } = require('../utils/passwordUtils');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Retrieve user's hashed password from the database based on username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Hash the password input by the user during login attempt
    const hashedPasswordInput = hashPassword(password);

    // Compare hashed passwords
    if (user.password === hashedPasswordInput) {
      // Passwords match, login successful
      // Implement login logic (e.g., generate session, set cookies)
      return res.status(200).json({ message: 'Login successful.' });
    } else {
      // Passwords don't match, login failed
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
