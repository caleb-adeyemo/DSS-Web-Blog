const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // Extract the token from the cookies
    const token = req.cookies.accessToken;

    // Check if the token exists
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        
        // // If the token is valid, attach the user information to the request object
        // req.user = user;
        
        // Call the next middleware in the chain
        next();
    });
}

module.exports = authenticateToken;
