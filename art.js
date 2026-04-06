const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const provider = require('./provider');

// Serve static files if needed
app.use(express.static('static'));

// Serve HTML at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API: get all paintings
app.get('/api/paintings', (req, res) => {
    const paintings = provider.getAllPaintings();
    res.json(paintings);
});

// API: get painting by ID
app.get('/api/paintings/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const painting = provider.getAllPaintings().find(p => String(p.id) === req.params.id);
    if (painting) res.json(painting);
    else res.status(404).json({ error: 'Painting not found' });
});

// API: get paintings by gallery
app.get('/api/artist/:id', (req, res) => {
    const artistId = req.params.id;
    const paintings = provider.getAllPaintings().filter(p => String(p.artistId) === artistId);
    res.json(paintings);
});

app.get('/api/gallery/:id', (req, res) => {
    const galleryId = req.params.id;
    const paintings = provider.getAllPaintings().filter(p => String(p.galleryId) === galleryId);
    res.json(paintings);
});

// API: get paintings by year range
app.get('/api/year/:min/:max', (req, res) => {
    const min = parseInt(req.params.min);
    const max = parseInt(req.params.max);
    const paintings = provider.getAllPaintings().filter(p => p.yearOfWork >= min && p.yearOfWork <= max);
    res.json(paintings);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
