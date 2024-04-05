const express = require("express")
const cors = require('cors');
const app = express()

// Use the cors middleware to allow requests from all origins
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { console.log(`server listening at port ${PORT}`) });

// Import route files
const postsRoute = require('./routes/posts');

// Use route files
app.use('/', postsRoute);