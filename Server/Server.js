const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const app = express();

// CORS configuration
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://localhost:8000'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// CSRF protection middleware
const csrfProtection = csurf({ cookie: true });

app.use(express.json());
app.use(cookieParser());
app.use('/user', csrfProtection);
app.use('/home', csrfProtection);
app.use('/search', csrfProtection);


// Routes
const loginRoute = require('./routes/login');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const searchRoute = require('./routes/search');

app.use('/', loginRoute);
app.use('/user', userRoute);
app.use('/home', postRoute);
app.use('/search', searchRoute);

// // Route to send CSRF token to the client
// app.get('/csrf-token', (req, res) => {
//     res.json({ csrfToken: req.csrfToken() });
// });

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server listening at port ${PORT}`);
});
