// Import required modules
const express = require('express');
const path = require('path');
const fs = require('fs');
let notes = require('./db/db.json');

// Create an instance of the Express application
const app = express();

// Serve static files from the public directory
app.use(express.static('public'));

// Parse incoming JSON data
app.use(express.json());

// Get all notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        res.json(notes);
    });
});

// Create a new note

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = notes.length;
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    notes = notes.filter(note => note.id !== parseInt(id));
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
});

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve notes.html at the /notes URL
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Set the port number for the server
const PORT = process.env.PORT || 3001;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});