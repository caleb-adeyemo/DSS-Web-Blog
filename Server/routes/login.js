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
            const accessToken = tokenFunctions.generateToken(username, process.env.AUTH_TOKEN_LIFE_SPAN);
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
            const accessToken = tokenFunctions.generateToken(username, process.env.ACCESS_TOKEN_LIFE_SPAN);
            const refreshToken = tokenFunctions.generateToken(username, process.env.REFRESH_TOKEN_LIFE_SPAN);
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

module.exports = router;
