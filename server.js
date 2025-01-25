
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve .glsl files with the correct MIME type
app.use((req, res, next) => {
  if (req.path.endsWith('.glsl')) {
    res.type('text/plain');
  }
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});