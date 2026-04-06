const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const provider = require('./provider');

// Serve static files from "static" folder
app.use(express.static('static'));

// Serve the tester page at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// API endpoint: Get all paintings
app.get('/api/paintings', (req, res) => {
    const paintings = provider.getAllPaintings();
    res.json(paintings);
});

// API endpoint: Get painting by ID
app.get('/api/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const painting = provider.getAllPaintings().find(p => p.id === id);
    if (painting) res.json(painting);
    else res.status(404).json({ error: 'Painting not found' });
});

// API endpoint: Get paintings by gallery ID
app.get('/api/gallery/:id', (req, res) => {
    const galleryId = parseInt(req.params.id);
    const paintings = provider.getAllPaintings().filter(p => p.galleryId === galleryId);
    res.json(paintings);
});

// API endpoint: Get paintings by artist ID
app.get('/api/artist/:id', (req, res) => {
    const artistId = parseInt(req.params.id);
    const paintings = provider.getAllPaintings().filter(p => p.artistId === artistId);
    res.json(paintings);
});

// API endpoint: Get paintings by year range
app.get('/api/year/:min/:max', (req, res) => {
    const min = parseInt(req.params.min);
    const max = parseInt(req.params.max);
    const paintings = provider.getAllPaintings().filter(p => p.yearOfWork >= min && p.yearOfWork <= max);
    res.json(paintings);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
