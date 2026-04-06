const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Render's port

const provider = require('./provider');

// Serve static files if you have a "static" folder
app.use(express.static('static'));

// Get all paintings
app.get('/', (req, res) => {
    const paintings = provider.getAllPaintings();
    res.json(paintings);
});

// Get paintings by gallery ID
app.get('/gallery/:id', (req, res) => {
    const galleryId = parseInt(req.params.id);
    const paintings = provider.getAllPaintings().filter(p => p.galleryId === galleryId);
    res.json(paintings);
});

// Get paintings by artist ID
app.get('/artist/:id', (req, res) => {
    const artistId = parseInt(req.params.id);
    const paintings = provider.getAllPaintings().filter(p => p.artistId === artistId);
    res.json(paintings);
});

// Get painting by ID (keep last)
app.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const painting = provider.getAllPaintings().find(p => p.id === id);
    if (painting) res.json(painting);
    else res.status(404).json({ error: 'Painting not found' });
});

// Get paintings by year range
app.get('/year/:min/:max', (req, res) => {
    const min = parseInt(req.params.min);
    const max = parseInt(req.params.max);
    const paintings = provider.getAllPaintings().filter(p => p.yearOfWork >= min && p.yearOfWork <= max);
    res.json(paintings);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
