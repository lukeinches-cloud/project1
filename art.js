const express = require('express');
const path = require('path');
const provider = require('./provider');

const app = express();
const PORT = 3000;

// Serve static files from 'static' folder
app.use(express.static(path.join(__dirname, 'static')));

// API route to get all paintings
app.get('/api/paintings', (req, res) => {
    res.json(provider.getAllPaintings());
});

// API route to get a painting by ID
app.get('/api/paintings/:id', (req, res) => {
    const painting = provider.getPaintingById(parseInt(req.params.id));
    if (painting) {
        res.json(painting);
    } else {
        res.status(404).send({ error: 'Painting not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});