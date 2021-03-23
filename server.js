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

// Make new notes that takes json
app.post('/api/notes', (req, res) => {
    let notes = parse();
    console.log(notes);
    let id = notes.length > 0 ? notes[notes.length-1].id + 1 : 1;
    req.body.id = id;
    console.log(req.body);
    notes.push(req.body);
    console.log(notes);
    fs.writeFile(__dirname + '/db.json', JSON.stringify(notes), (err) => {
      if (err) throw err;
    });
    res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
  let notes = parse();
  let newNotes = notes.filter(note => note.id != req.params.id);
  fs.writeFile(__dirname + '/db.json', JSON.stringify(newNotes), (err) => {
    if (err) throw err;
  });
  res.json(newNotes);
});


// Start server
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
}); 
