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


router.post("/", async (req, res) => {
    const message = req.body["tweet"];
    try {
        let response = await database.addPost(message)
        response = response.rows
        
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
