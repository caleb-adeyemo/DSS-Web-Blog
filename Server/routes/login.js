const express = require('express');
const router = express.Router();
const databaseLogin = require("../database_queries/login");
const databaseUser = require("../database_queries/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
    // Decompose the credentials json obj
    const username = req.body.username;
    const password = req.body.password;

    try {
        // Authenticate user
        const dbPassword = await databaseLogin.getUsersPassword(username);
        const match = await bcrypt.compare(password, dbPassword);

        if (match) {
            // User authenticated successfully
            const user = { 
                username: username,
            };

            // Generate access token
            const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN);
            
            // Get user's name
            const name  = await databaseUser.getUsersName(username)

            // Set access token as HttpOnly cookie
            res.cookie('accessToken', accessToken, { httpOnly: true });
            res.cookie('username', username, { httpOnly: false });
            res.cookie('name', name, { httpOnly: false });

            // Send response with token
            res.status(200).json({
                success: true,
                message: "Authentication successful",
                username: username // Optionally, you can send additional user info
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
