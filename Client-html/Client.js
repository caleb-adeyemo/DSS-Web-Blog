// // const express = require("express");
// // const path = require("path");

// // const app = express();

// // // Serve static files from the 'Client-html' directory
// // app.use(express.static(path.join(__dirname, "../../Client-html")));

// // // Route handler for the root route
// // app.get('/', function(req, res) {
// //   res.sendFile(path.join(__dirname, "../../Client-html/Pages/Login/login.html"));
// // });

// // const PORT = 65000;

// // app.listen(PORT, () => {
// //   console.log(`Server listening at http://localhost:${PORT}`);
// // });

// const express = require('express');
// const path = require('path');


// const app = express();

// // Serve static files from the 'public' directory
// app.use(express.static('Pages'));
// app.get('/', (req,res) =>{
//   console.log("here")
//   res.render('/Login')
// })

// // Start the server
// const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'Pages' directory
app.use(express.static(path.join(__dirname, 'Pages')));

// Route handler for the root route
app.get('/', (req, res) => {
  // Send the index.html file from the 'Login' directory
  res.sendFile(path.join(__dirname, 'Pages', 'Login', 'login.html'));
});

app.get('/home', (req, res) => {
  // Send the index.html file from the 'Login' directory
  res.sendFile(path.join(__dirname, 'Pages', 'Home', 'home.html'));
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

