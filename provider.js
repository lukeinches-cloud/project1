const fs = require('fs');
const path = require('path');

// Path to your JSON file
const paintingsPath = path.join(__dirname, 'paintings', 'json', 'paintings.json');

function getAllPaintings() {
  try {
    const data = fs.readFileSync(paintingsPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON file:', err);
    return []; // return empty array if file not found
  }
}

module.exports = { getAllPaintings };
