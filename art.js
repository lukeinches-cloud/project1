const express = require('express');
const app = express();
const port = 3000;

// Import provider module
const provider = require('./provider');

// Check what we imported (debug)
console.log(provider);

// Serve static files from "static" folder
app.use(express.static('static'));

// API endpoint for paintings
app.get('/api/paintings', (req, res) => {
    const paintings = provider.getAllPaintings();
    res.json(paintings);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});