// provider.js
const fs = require('fs');
const path = require('path');

// Load the JSON file
const dataPath = path.join(__dirname, 'data.json');
let artData = [];

try {
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    artData = JSON.parse(fileContents);
} catch (err) {
    console.error('Error reading JSON file:', err);
}

// Export the data
module.exports = {
    getAllArt: () => artData,
    getArtById: (id) => artData.find(item => item.id === id)
};