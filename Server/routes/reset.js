const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config();


const database = require("../database_queries/users");
const bcrypt = require("bcrypt");

const tokenFunctions = require("../Authentication/auth")
const validator = require("../Validation/validate")
const csrfProtection = require("../CSRF/csfr");


// Route to send reset link
router.post('/', (req, res) => {
    const { email } = req.body;

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
        text: 'Here is your password reset link: http://localhost:8000/send-reset-link/reset-password?email=' + encodeURIComponent(email),
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
    const { email, newPassword } = req.body;

    // Create Salt to append to the password
    const salt = await bcrypt.genSalt()

    // Hash the password
    const hPassword = await bcrypt.hash(newPassword, salt)

    // Database update logic here
    const success = await database.changeUserPassword(email, hPassword);
    if (success) {
        res.status(200).json({"msg": "password reset successful", "success": success});

    } else {
        res.status(200).json({"msg": "An Error occured, pasword reset not successful", "success": success});
    }
});

module.exports = router;