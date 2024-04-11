const express = require('express');
const router = express.Router();
const database = require("../database_queries/users");
const bcrypt = require("bcrypt");
const authenticateToken = require("../Authentication/auth")

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
        const success = await database.createUsers(name, username, email, hPassword, phone);

        if (success) {
            res.status(200).json({"msg": "User successfully Created"});
        } else {
            res.status(200).json({"msg": "An Error occured, User not created"});
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

// Get Users Personal tweets
router.get("/personal_page", authenticateToken, async (req, res) => {
    try {
        // GET THE USERNAME FROM THE COOKIE
        const username = req.cookies.username;
        console.log("Username: " + username)
        // GET ALL THE POSTS RELATING TO THE USERNAME
        let response = await database.getUsersPosts(username)
        console.log("data: ")
        console.log(response.rows)

        const data = {
            "message": "Load successful",
            "data": response.rows,
            "status_code": 200,
        }
        res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching posts:", error);
        const data = {
            "message": "An error occurred while fetching posts.",
            "data": null,
            "status_code": 500
        }
        res.status(500).send(data);
    }
});
module.exports = router;
