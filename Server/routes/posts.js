const express = require('express');
const router = express.Router();
const database = require("../database_queries/users");
const authenticateToken = require("../Authentication/auth")


router.get("/", authenticateToken, async (req, res) => {
    try {
        let response = await database.getAllPosts()
        response = response.rows
        const data = {
            "message": "Load successful",
            "data": response,
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


router.post("/", authenticateToken, async (req, res) => {
    // GET THE USERNAME FROM THE COOKIES
    const username = req.cookies.username;

    // GET THE MESSAGE FROM THE REQ BODY
    const message = req.body["message"];

    try {
        // TRY TO ADD THE TWEET TO THE DB
        let response = await database.addPost(username, message).rows
        
        const data = {
            "message": "Load successful",
            "data": response,
            "status_code": 200
        }
        res.status(200).send(data);
    } catch (error) {
        console.error("Error Adding post:", error);
        const data = {
            "message": "An error occurred while adding post.",
            "data": null,
            "status_code": 500
        }
        res.status(500).send(data);
    }
});

module.exports = router;
