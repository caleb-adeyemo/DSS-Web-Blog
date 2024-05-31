const express = require('express');
const router = express.Router();
const database = require("../database_queries/search");
const tokenFunctions = require("../Authentication/auth")
const csrfProtection = require("../CSRF/csfr");

// Route to send CSRF token to the client
router.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});


router.post("/", tokenFunctions.authenticateToken, csrfProtection, async (req, res) => {
    // GET THE MESSAGE FROM THE REQ BODY
    const searchValue = req.body["value"]

    // Debug
    // console.log("searchValue: " + searchValue)
    try {
        // TRY TO GET POST CONTAINING SEARCH WORD
        let response = await database.getPostsWithWord(searchValue)
        const data = {
            "message": "Search successful",
            "data": response,
            "success": true
        }
        res.status(200).send(data);
    } catch (error) {
        console.error("Error retriving post:", error);
        const data = {
            "message": "An error occurred while finding posts.",
            "data": null,
            "success": false
        }
        res.status(500).send(data);
    }
});

module.exports = router;
