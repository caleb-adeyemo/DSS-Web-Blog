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

app.get('/2fa', (req, res) => {
  // Send the index.html file from the 'Login' directory
  res.sendFile(path.join(__dirname, 'Pages', '2FA', '2FA.html'));
});

app.get('/home', (req, res) => {
  // Send the index.html file from the 'Login' directory
  res.sendFile(path.join(__dirname, 'Pages', 'Home', 'home.html'));
});

app.get('/myPage', (req, res) => {
  // Send the index.html file from the 'Login' directory
  res.sendFile(path.join(__dirname, 'Pages', 'MyPage', 'myPage.html'));
});
app.get('/search', (req, res) => {
  // Send the index.html file from the 'Login' directory
  res.sendFile(path.join(__dirname, 'Pages', 'Search', 'search.html'));
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

