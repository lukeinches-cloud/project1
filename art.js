const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const provider = require('./provider');

// Serve static files
app.use(express.static('static'));

// All paintings
app.get('/api/paintings', (req, res) => {
    res.json(provider.getAllPaintings());
});

// Single painting by paintingID
app.get('/api/paintings/:id', (req, res) => {
    const painting = provider.getAllPaintings().find(p => String(p.paintingID) === req.params.id);
    if (painting) res.json(painting);
    else res.status(404).json({ error: 'Painting not found' });
});

// Paintings by artist
app.get('/api/artist/:id', (req, res) => {
    const paintings = provider.getAllPaintings().filter(p => String(p.artist.artistID) === req.params.id);
    res.json(paintings);
});

// Paintings by gallery
app.get('/api/gallery/:id', (req, res) => {
    const paintings = provider.getAllPaintings().filter(p => String(p.gallery.galleryID) === req.params.id);
    res.json(paintings);
});

// Paintings by year range
app.get('/api/year/:min/:max', (req, res) => {
    const min = parseInt(req.params.min);
    const max = parseInt(req.params.max);
    const paintings = provider.getAllPaintings().filter(p => p.yearOfWork >= min && p.yearOfWork <= max);
    res.json(paintings);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
