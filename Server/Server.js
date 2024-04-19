const express = require("express"); // Express
const cors = require('cors'); // Routing
const cookieParser = require('cookie-parser'); // Cookies

const app = express()

// Use the cors middleware to allow requests from specific origins
// Allow requests from multiple origins
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://localhost:8000'];
app.use(cors({
    origin: function (origin, callback) {
        // Check if the request origin is in the allowedOrigins array
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Block the request
        }
    },
    credentials: true // Allow cookies to be sent along with the request
}));

app.use(express.json())
app.use(cookieParser());


const PORT = 3001;
app.listen(PORT, () => { console.log(`server listening at port ${PORT}`) });

// Import route files
const loginRoute = require('./routes/login');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const searchRoute = require('./routes/search');

// Use route files
app.use('/', loginRoute);
app.use('/user', userRoute);
app.use('/home', postRoute);
app.use('/search', searchRoute)
