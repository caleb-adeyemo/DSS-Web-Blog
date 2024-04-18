const express = require("express"); // Express
const cors = require('cors'); // Routing
const cookieParser = require('cookie-parser'); // Cookies

const app = express()

// Use the cors middleware to allow requests from all origins
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
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
