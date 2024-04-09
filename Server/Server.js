const express = require("express"); // Express
const cors = require('cors'); // Routing
const cookieParser = require('cookie-parser'); // Cookies
const session = require('express-session'); // Sessions
const jwt = require("jsonwebtoken"); // JWT tokens
const bcrypt = require("bcrypt");
// const RedisStore = require('connect-redis')(session);
// const redis = require('redis');

// const redisClient = redis.createClient();

// app.use(session({
//     store: new RedisStore({ client: redisClient }),
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Set secure to true in production if using HTTPS
// }));

// app.use(cookieParser());
// app.use(cookieSession({
//     name: 'session',
//     secret: 'your_secret_key',
//     secure: false, // Set to true in production if using HTTPS
//     httpOnly: true
// }));


const app = express()

// Use the cors middleware to allow requests from all origins
app.use(cors());
app.use(express.json())


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { console.log(`server listening at port ${PORT}`) });

// Import route files
const loginRoute = require('./routes/login');
const postsRoute = require('./routes/posts');

// Use route files
app.use('/', loginRoute);
app.use('/home', postsRoute);