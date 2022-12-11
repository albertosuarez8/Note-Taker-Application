const express = require('express');
const db = require('./db/db.json')
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3001;
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
  res.json(db);
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})