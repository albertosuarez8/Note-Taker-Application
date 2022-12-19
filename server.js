const express = require('express');
const db = require('./db/db.json')
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.json(JSON.parse(data));
    }
  })
})

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {

      const parsedNotes = JSON.parse(data);
      newNote.id = uuid();
      parsedNotes.push(newNote);

      fs.writeFile(
        './db/db.json',
        JSON.stringify(parsedNotes, null, 4),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : res.status(200).send("Added Successfully")
      );
    }
  });
})

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let parsedNotes = JSON.parse(data);
      let noteIndex = parsedNotes.findIndex(n => n.id == id);
      parsedNotes.splice(noteIndex, 1);
      fs.writeFile(
        './db/db.json',
        JSON.stringify(parsedNotes, null, 4),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : res.status(200).send("Deleted Successfully")
      );
    }
  })
}) 

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

const uuid = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};