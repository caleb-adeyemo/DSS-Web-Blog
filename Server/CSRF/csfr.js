// CSRF protection middleware
const csrfProtection = require('csurf')({
    cookie: {
        httpOnly: true
    }
});

module.exports = csrfProtection;