const jwt = require('jsonwebtoken');

// Function to generate access or refresh token
function generateToken(username, expTime) {
    const user = {
        username: username,
        exp: Math.floor(Date.now() / 1000) + (expTime * 60), // Expiration time in minutes
        iat: Math.floor(Date.now() / 1000) // Issued at time
    };
    return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN);
}


function authenticateToken(req, res, next) {
    // Extract the access token and refresh token from the cookies
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // Check if the access token exists
    if (!accessToken) {
        return res.sendStatus(401); // Unauthorized
    }

    // Verify the access token
    jwt.verify(accessToken, process.env.ACCESS_SECRET_TOKEN, (err, accessTokenPayload) => {
        if (err) {
            // Access token is expired or invalid
            console.log("access token expired");

            // Check if a refresh token exists
            if (!refreshToken) {
                return res.sendStatus(403); // Forbidden
            }
            console.log("refresh token exists");

            // Verify the refresh token
            jwt.verify(refreshToken, process.env.ACCESS_SECRET_TOKEN, (err, refreshTokenPayload) => {
                if (err) {
                    console.log("Refresh token expired");
                    return res.sendStatus(403); // Forbidden
                }

                // Refresh token is valid
                console.log("refresh token is valid");

                // Generate a new access token
                const newAccessToken = generateToken(refreshTokenPayload.username, process.env.ACCESS_TOKEN_LIFE_SPAN);
                
                // // Attach the user information and new access token to the request object
                // req.cookies.accessToken = newAccessToken;
                
                // Set the new access token as a cookie
                res.cookie('accessToken', newAccessToken, { httpOnly: true });
                
                console.log("RESET THE TOKENS!!!!!!.... IT WORKS")

                // Call the next middleware in the chain
                next();
            });
        } else {
            // Access token is valid
            // Attach the user information to the request object
            req.user = accessTokenPayload;
            
            // Call the next middleware in the chain
            next();
        }
    });
}

module.exports = {generateToken, authenticateToken};
