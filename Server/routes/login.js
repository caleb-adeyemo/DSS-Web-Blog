const express = require('express');
const router = express.Router();
const databaseLogin = require("../database_queries/login");
const databaseUser = require("../database_queries/users");
const bcrypt = require("bcrypt");
const tokenFunctions = require("../Authentication/auth");
const { authenticator } = require('otplib');
const qrCode = require('qrcode');

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    try {
        const dbPassword = await databaseLogin.getUsersPassword(username);
        const match = await bcrypt.compare(password, dbPassword);

        if (match) {
            const accessToken = tokenFunctions.generate_access_refresh_Token(username, process.env.AUTH_TOKEN_LIFE_SPAN);
            let secret = await databaseUser.getUsersSecret(username);
            const otpUrl = authenticator.keyuri(username, 'logger LTM', secret);
            const qrCodeImageDataUrl = await qrCode.toDataURL(otpUrl);

            res.cookie('accessToken', accessToken, { httpOnly: true });
            res.cookie('qrCodeImageDataUrl', qrCodeImageDataUrl, { httpOnly: false });
            res.cookie('username', username, { httpOnly: false });

            res.status(200).json({ success: true });
        } else {
            res.status(200).json({ success: false, message: "Credential Error: Incorrect username and/or password" });
        }
    } catch (error) {
        console.error("Error validating credentials:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.post("/Auth/Qrcode", tokenFunctions.authenticateToken, async (req, res) => {
    const otp = req.body.otp;
    const username = req.cookies.username;
    const secret = await databaseUser.getUsersSecret(username);

    try {
        const isValid = authenticator.verify({ token: otp, secret });

        if (isValid) {
            const accessToken = tokenFunctions.generate_access_refresh_Token(username, process.env.ACCESS_TOKEN_LIFE_SPAN);
            const refreshToken = tokenFunctions.generate_access_refresh_Token(username, process.env.REFRESH_TOKEN_LIFE_SPAN);
            const name = await databaseUser.getUsersName(username);

            res.cookie('accessToken', accessToken, { httpOnly: true });
            res.cookie('refreshToken', refreshToken, { httpOnly: true });
            res.cookie('username', username, { httpOnly: false });
            res.cookie('name', name, { httpOnly: false });

            res.status(200).json({ success: true, message: "Authentication successful" });
        } else {
            res.status(401).json({ success: false, message: "Invalid OTP" });
        }
    } catch (error) {
        console.error("Error validating credentials:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Create Users
router.post("/create_account", async (req, res) => {
    // Decompose the credentials json obj
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;

    // Try to validate the credentials 
    try {
        // Create Salt to append to the password
        const salt = await bcrypt.genSalt()

        // Hash the password
        const hPassword = await bcrypt.hash(password, salt)

        // Bool 'success' if user was successfully added to hte data base
        const success = await databaseUser.createUsers(name, username, email, hPassword, phone);
        if (success) {
            res.status(200).json({"msg": "User successfully Created", "success": success});
            // Generate secret key for user; for OTP
            const secret = authenticator.generateSecret();

            // Store secret in the DB
            await databaseUser.storeSecret(username, secret);
        } else {
            res.status(200).json({"msg": "An Error occured, User not created", "success": success});
        }

    } catch (error) {
        console.error("Error:", error);
        const data = {
            "message": "Internal Server Error",
            "status_code": 500
        };
        res.status(500).send(data);
    }
});

module.exports = router;
