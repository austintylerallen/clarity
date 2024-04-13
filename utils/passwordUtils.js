const { hashPassword } = require('./utils/passwordUtils.js');

// Example usage in a signup route handler
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the password before saving it to the database
    const hashedPassword = hashPassword(password);

    // Save the hashed password to the database along with other user data
    // Your code for saving user data goes here...
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
