const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const provider = require('./provider');

// Serve static files (index.html, CSS, JS, images)
app.use(express.static('static'));

// API endpoints
app.get('/api/paintings', (req, res) => {
  const paintings = provider.getAllPaintings();
  res.json(paintings);
});

app.get('/api/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const painting = provider.getAllPaintings().find(p => p.id === id);
  if (painting) res.json(painting);
  else res.status(404).json({ error: 'Painting not found' });
});

app.get('/api/gallery/:id', (req, res) => {
  const galleryId = parseInt(req.params.id);
  const paintings = provider.getAllPaintings().filter(p => p.galleryId === galleryId);
  res.json(paintings);
});

app.get('/api/artist/:id', (req, res) => {
  const artistId = parseInt(req.params.id);
  const paintings = provider.getAllPaintings().filter(p => p.artistId === artistId);
  res.json(paintings);
});

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
