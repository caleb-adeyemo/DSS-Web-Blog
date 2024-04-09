const express = require('express');
const router = express.Router();
const database = require("../database_queries/login");



// function validateCookie(req, res, next){
//     const {cookies} = req;
//     if ("session_id" in cookies){
//         console.log("session Id exists")
//         if(cookies.session_id === "12345"){
//             next();
//         } else res.status(403).send({"msg":"Not Authenticated"})
//     }else res.status(403).send({"msg":"Not Authenticated"});
// }

// router.get("/", (req, res) =>{
//     res.cookie("session_id", "12345")
//     res.status(200).json({"msg": "Logged in"})
// })

// router.get("/protected", validateCookie, (req,res)=>{
//     res.status(200).json({"msg":"You're Authenticated"})
// })

// router.post('/login', (req, res) =>{
//     console.log(req.sessionID)
//     console.log(req.body)
//     const {username, password} = req.body;

//     console.log(username + " " + password)
    

//     if(username && password){
//         if (req.session.authenicated){
//             res.json(req.session);
//         } else{
//             if(password === '123'){
//                 console.log("1")
//                 req.session.authenicated = true;
//                 req.session.user = {
//                     username,password
//                 };
//                 res.json(req.session);
//             } else{
//                 console.log("2")
//                 res.status(403).json({"msg":"Bad credentials"})
//             }
//         }
//     } else res.status(403).json({"msg":"Incomplete credentials"})
// })

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
