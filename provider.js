const fs = require('fs');
const path = require('path');

// Path to your JSON file
const paintingsPath = path.join(__dirname, 'paintings', 'json', 'paintings.json');

// Function to get all paintings
function getAllPaintings() {
    try {
        const data = fs.readFileSync(paintingsPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading JSON file:', err);
        return [];
    }
}

// Optionally, add helpers for single painting, artist, gallery if you want
function getPaintingById(id) {
    return getAllPaintings().find(p => p.id === id);
}

module.exports = {
    getAllPaintings,
    getPaintingById
};
