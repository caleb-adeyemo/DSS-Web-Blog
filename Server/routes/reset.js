const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config();


const database = require("../database_queries/users");
const bcrypt = require("bcrypt");

const tokenFunctions = require("../Authentication/auth")
const jwt = require('jsonwebtoken');



// Route to send reset link
router.post('/', (req, res) => {
    const { email } = req.body;

    // Generate token
    const resetPasswordToken = tokenFunctions.generate_password_reset_Token(email, true, 30); // 30mins

    // Send email logic here
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: email,
        subject: 'Logger password Reset Link',
        text: 'Here is your password reset link: http://localhost:8000/send-reset-link/reset-password?token=' + encodeURIComponent(resetPasswordToken) + '&email=' + encodeURIComponent(email),
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Error sending reset link' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ success: true, message: 'Reset link sent successfully' });
        }
    });
});

// Route to handle password reset
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    // Verify the token
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, async (err, decoded) => {
        if (err || !decoded.valid) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        const email = decoded.email;

        // Create Salt to append to the password
        const salt = await bcrypt.genSalt();

        // Hash the password
        const hPassword = await bcrypt.hash(newPassword, salt);

        // Database update logic here
        const success = await database.changeUserPassword(email, hPassword);
        if (success) {
            // Invalidate the token after use
            decoded.valid = false;
            const invalidatedToken = jwt.sign(decoded, process.env.ACCESS_SECRET_TOKEN);
            
            res.status(200).json({ success: true, message: 'Password reset successful', invalidatedToken });
        } else {
            res.status(500).json({ success: false, message: 'Error resetting password' });
        }
    });
});

module.exports = router;