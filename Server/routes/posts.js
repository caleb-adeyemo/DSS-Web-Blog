const express = require('express');
const router = express.Router();
const database = require("../database_queries/posts");

router.get("/", async (req, res) => {
    try {
        let response = await database.getAllPosts()
        response = response.rows
        
        const data = {
            "message": "Load successful",
            "data": response,
            "status_code": 200
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
