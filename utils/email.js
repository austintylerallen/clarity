// utils/email.js

const nodemailer = require('nodemailer');

// Function to send password reset email
async function sendPasswordResetEmail(email, resetToken) {
  const transporter = nodemailer.createTransport({
    // Configure email transport (e.g., SMTP, SendGrid, etc.)
  });

  const mailOptions = {
    from: 'your@example.com',
    to: email,
    subject: 'Password Reset',
    html: `<p>You have requested a password reset. Click <a href="http://example.com/reset-password/${resetToken}">here</a> to reset your password.</p>`
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendPasswordResetEmail };
