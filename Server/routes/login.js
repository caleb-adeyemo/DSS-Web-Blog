const express = require('express');
const router = express.Router();
const database = require("../database_queries/login");

router.post("/", async (req, res) => {
    // Decompose the credentials json obj
    const username = req.body["userName"];
    const password = req.body["password"];

    // Try to validate the credentials
    try {
        const isValid = await database.validate(username, password);

        // Check if credentials are valid
        if (isValid) {
            const data = {
                "message": "Login successful",
                "status_code": 200
            };
            res.status(200).send(data);
        } else {
            const data = {
                "message": "Incorrect Username/Password",
                "status_code": 401
            };
            res.status(200).send(data);
        }
    } catch (error) {
        console.error("Error validating credentials:", error);
        const data = {
            "message": "Internal Server Error",
            "status_code": 500
        };
        res.status(500).send(data);
    }
});

module.exports = router;
