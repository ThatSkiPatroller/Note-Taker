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
app.use(express.static('./'));

// Routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/notes.html'));
});

// const readFile = 
function parse () {
  let notes = fs.readFileSync(__dirname + '/db.json');
  let parsed = JSON.parse(notes);
  return parsed;
}
app.get('/api/notes', (req, res) => {
  // res.sendFile(path.join(__dirname, '/db.json'));
  let notes = parse();
  res.json(notes);
});

let id = 1;
// Make new notes that takes json
app.post('/api/notes', (req, res) => {
    fs.readFile('/db.json', 'utf8', (err, notes) => {
      if (err) throw err;
});
});

// Start server
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
}); 
