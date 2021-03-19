// npm packages
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Set initial port
const PORT = process.env.PORT || 8080;

// Allow Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('Develop/public/'));

// Routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/Develop/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/Develop/db/db.json'))
    res.json(data)
});

// Make new notes that takes json
app.post('/api/notes', (req, res) => {
    const note = (re)
})

// Start server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`)); 
