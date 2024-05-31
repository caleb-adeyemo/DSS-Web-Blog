const express = require('express');
const router = express.Router();
const database = require("../database_queries/users");
const bcrypt = require("bcrypt");
const tokenFunctions = require("../Authentication/auth")
const {authenticator} = require('otplib');
const csrfProtection = require("../CSRF/csfr");


// Route to send CSRF token to the client
router.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});


// Get Users Personal tweets
router.get("/personal_page", tokenFunctions.authenticateToken, async (req, res) => {
    try {
        // GET THE USERNAME FROM THE COOKIE
        const username = req.cookies.username;
        
        // GET ALL THE POSTS RELATING TO THE USERNAME
        let response = await database.getUsersPosts(username)
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

// Edit Users Personal tweets
router.post("/edit", tokenFunctions.authenticateToken, csrfProtection, async (req, res) => {
    try {
        // GET THE Post ID FROM THE req
        const postID = req.body.post_id;
        const postMessage = req.body.message;
        
        // GET THE POST RELATING TO THE post id
        let response = await database.editPost(postID, postMessage)

        // console.log(response)
        const data = {
            "message": "Edit successful",
            "data": response,
            "status_code": 200,
        }
        res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching posts:", error);
        const data = {
            "message": "An error occurred while fetching posts.",
            "data": response,
            "status_code": 500
        }
        res.status(500).send(data);
    }
});

// Delete Users Personal tweets
router.post("/deletePost", tokenFunctions.authenticateToken, csrfProtection, async (req, res) => {
    // Debug
    // console.log("It went to the delete route!!!")
    // console.log(req.body)
    
    try {
        // GET THE Post ID FROM THE req
        const postID = req.body.post_id;
        
        // GET ALL THE POSTS RELATING TO THE USERNAME
        let response = await database.deletePost(postID)

        // console.log(response)
        const data = {
            "message": "Delete successful",
            "data": response,
            "status_code": 200,
        }
        res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching posts:", error);
        const data = {
            "message": "An error occurred while fetching posts.",
            "data": response,
            "status_code": 500
        }
        res.status(500).send(data);
    }
});
module.exports = router;
