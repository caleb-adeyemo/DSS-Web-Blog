const express = require('express');
const router = express.Router();
const databaseLogin = require("../database_queries/login");
const databaseUser = require("../database_queries/users");
const bcrypt = require("bcrypt");
const tokenFunctions = require("../Authentication/auth")


router.post("/", async (req, res) => {
    // Decompose the credentials json obj
    const { username, password } = req.body;

    try {
        // Authenticate user
        const dbPassword = await databaseLogin.getUsersPassword(username);
        const match = await bcrypt.compare(password, dbPassword);

        if (match) {
            // User authenticated successfully

            // Generate access token
            const accessToken = tokenFunctions.generateToken(username, process.env.ACCESS_TOKEN_LIFE_SPAN);

            // Generate refresh token
            const refreshToken = tokenFunctions.generateToken(username, process.env.REFRESH_TOKEN_LIFE_SPAN);

            // Get user's name
            const name = await databaseUser.getUsersName(username);

            // Set access token as HttpOnly cookie
            res.cookie('accessToken', accessToken, { httpOnly: true});
            res.cookie('refreshToken', refreshToken, { httpOnly: true});
            res.cookie('username', username, { httpOnly: false });
            res.cookie('name', name, { httpOnly: false });

            // Send response with token in cookies
            res.status(200).json({
                success: true,
                message: "Authentication successful",
                name: name
            });
        } else {
            // Incorrect password
            res.status(401).json({ success: false, message: "Incorrect username or password" });
        }
    } catch (error) {
        console.error("Error validating credentials:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
