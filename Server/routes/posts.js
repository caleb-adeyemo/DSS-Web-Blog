const express = require('express');
const router = express.Router();
const database = require("../database_queries/users");
const tokenFunctions = require("../Authentication/auth")
const validator = require("../Validation/validate")
const csrfProtection = require("../CSRF/csfr");


// Route to send CSRF token to the client
router.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});


router.get("/", tokenFunctions.authenticateToken, async (req, res) => {
    try {
        let response = await database.getAllPosts()
        response = response.rows

        // Iterate over the response array and decode each message
        const decodedResponse = response.map(post => {
            // Decode the message using decodeURIComponent()
            post.post_msg = decodeURIComponent(post.post_msg);
            // console.log(post.post_msg)
            return post;
        });

        const data = {
            "message": "Load successful",
            "data": decodedResponse,
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


router.post("/", tokenFunctions.authenticateToken, csrfProtection, async (req, res) => {

    // GET THE USERNAME FROM THE COOKIES
    const username = req.cookies.username;

    // GET THE MESSAGE FROM THE REQ BODY
    const message = req.body["postMessage"];

    // Validate and sanitize the message input
    const sanitizedMessage = validator.sanitizeMessage(message);

    // Return Null if the message exeeds 280 characters and remove special characters
    if (!sanitizedMessage) {
        const data = {
            "message": "Invalid message format",
            "success": false
        };
        return res.status(200).send(data); 
    }

    try {
        // TRY TO ADD THE TWEET TO THE DB
        let response = await database.addPost(username, sanitizedMessage).rows
        
        const data = {
            "message": "Load successful",
            "data": response,
            "success": true
        }
        res.status(200).send(data);
    } catch (error) {
        console.error("Error Adding post:", error);
        const data = {
            "message": "An error occurred while adding post.",
            "success": false
        }
        res.status(500).send(data);
    }
});

module.exports = router;
